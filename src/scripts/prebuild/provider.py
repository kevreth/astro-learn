import argparse, os, pandas as pd, shutil, re
from pandas.core.frame import DataFrame
import unicodedata
BUILD = os.path.join('build/us')
def remove_diacritics(text):
    text = ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )
    replacements = {'Å': 'A', 'Ø': 'O', 'å': 'a', 'ø': 'o', 'Æ': 'AE', 'æ': 'ae'}
    return ''.join(replacements.get(c, c) for c in text)
def sanitize(locality:str) -> str:
    #makes compatible with both filesystems and urls
    retval = locality.lower().replace(" ", "-")
    retval = re.sub(r'[^\w\-]', '', retval)
    retval = remove_diacritics(retval)
    return retval
def group_and_save_csv(df:DataFrame, output_dir, niche_):
    base_dir = output_dir
    result = {}
    group_columns = ["Region", "Locality"]
    if niche_ is None:
        group_columns.append('Niche')
    for group_keys, group in df.groupby(group_columns):
        if niche_ is None:
            region, locality, niche = group_keys
        else:
            region, locality = group_keys
            niche = niche_
        locality_clean = sanitize(locality)
        dir_path = os.path.join(base_dir, region.replace(' ', '-'), locality_clean, niche)
        create_directory = not os.path.exists(dir_path)
        if region not in result:
            result[region] = {}
        result[region][locality] = {
            "create_directory": create_directory,
            "file": os.path.join(dir_path.lower(), "content.csv"),
            "data": group.to_dict(orient="records")
        }
    return result
def execute_yaml_structure(data):
    shutil.rmtree('../build', ignore_errors=True)
    os.makedirs('../build', exist_ok=True)
    for region, localities in data.items():
        for locality, details in localities.items():
            if details["create_directory"]:
                os.makedirs(os.path.dirname(details["file"]), exist_ok=True)
            pd.DataFrame(details["data"]).to_csv(details["file"], index=False)
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('Locality')
    args = parser.parse_args()
    Locality = args.Locality
    Locality_df = pd.read_csv(Locality, dtype=str)
    yaml_data = group_and_save_csv(Locality_df, BUILD, None)
    execute_yaml_structure(yaml_data)
    