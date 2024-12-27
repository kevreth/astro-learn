import argparse, os, pandas as pd, yaml
from typing import List
from pandas.core.frame import DataFrame
from provider import group_and_save_csv, execute_yaml_structure
MIN_LOCNI_COUNT = 20
BUILD = os.path.join('build')
def save_yaml(data, output_file):
    with open(output_file, "w") as f:
        yaml.dump(data, f, default_flow_style=False)
def update_locality_df(Locality_df):
    condition = ~Locality_df['exists_in_locality_df'] & \
                Locality_df['locality_postal'].notna() & \
                Locality_df['locality_postal'].str.strip().astype(bool) & \
                Locality_df['region_postal'].notna() & \
                Locality_df['region_postal'].str.strip().astype(bool)
    Locality_df.loc[condition, 'Locality'] = Locality_df.loc[condition, 'locality_postal']
    Locality_df.loc[condition, 'Region'] = Locality_df.loc[condition, 'region_postal']
    Locality_df.loc[condition, 'exists_in_locality_df'] = True
    return Locality_df
def summarize(unmerged, columns:List[str]):
    unmerged_summary = unmerged.groupby(columns).size().reset_index(name='Count')
    unmerged_summary = unmerged_summary.sort_values(by='Count', ascending=False)
    return unmerged_summary
def correct_locality(Locality_df:DataFrame, locality_df:DataFrame, postal_df:DataFrame):
    postal_df.rename(columns={'postal':'postal_postal','locality':'locality_postal','region':'region_postal'}, inplace=True)
    Locality_df['Locality_lower'] = Locality_df['Locality'].str.lower()
    Locality_df['Region_lower'] = Locality_df['Region'].str.lower()
    locality_df.loc[:, 'locality_lower'] = locality_df['proper'].str.lower()
    locality_df.loc[:, 'region_lower'] = locality_df['region'].str.lower()
    locality_df = locality_df[['locality_lower', 'region_lower', 'proper']]
    merged = Locality_df.merge(
        postal_df,
        how='inner',
        left_on=['Postal'],
        right_on=['postal_postal']
    )
    valid_combinations = set(zip(locality_df['locality_lower'], locality_df['region_lower']))
    merged['exists_in_locality_df'] = merged.apply(
        lambda row: (row['Locality_lower'], row['Region_lower']) in valid_combinations, axis=1
    )
    merged = update_locality_df(merged)
    return merged
def main(Locality: str, locality: str, postal):
    Locality_df = pd.read_csv(Locality, dtype=str)
    locality_df = pd.read_csv(locality, dtype=str)
    postal_df = pd.read_csv(postal, dtype=str)
    Locality_df['Locality'] = Locality_df['Locality'].apply(lambda x: x.strip() if isinstance(x, str) else x)
    Locality_df['Locality'] = Locality_df['Locality'].apply(lambda x: x[:-1] if isinstance(x, str) and x.endswith(',') else x)
    Locality_df['Locality'] = Locality_df['Locality'].apply(lambda x: ' '.join(x.split()) if isinstance(x, str) else x)
    abbreviations(Locality_df)
    merged = correct_locality(Locality_df, locality_df, postal_df)
    merged = merged.query('exists_in_locality_df==True')
    unmerged = merged.query('exists_in_locality_df==False')
    unmerged_summary = summarize(unmerged, ['Locality_lower', 'Region_lower'])
    unmerged = unmerged.drop(columns=['Locality_lower', 'Region_lower', 'postal_postal', 'locality_postal', 'region_postal', 'exists_in_locality_df'])
    merged = merged.drop(columns=['Locality_lower', 'Region_lower', 'postal_postal', 'Locality', 'Region', 'exists_in_locality_df'])
    merged.rename(columns={'locality_postal':'Locality','region_postal':'Region'}, inplace=True)
    merged = merged[['Name','Broker','URL','Phone','Email','Street','Locality','Region','Postal','Country','Last Activity','Listings','Sales']]
    merged['URL'] = merged['URL'].str.lower()
    merged['URL'] = merged['URL'].apply(lambda x: x.replace('www.', 'http://www.', 1) if str(x).startswith('www.') else x)
    merged = merged.groupby(['Locality', 'Region']).filter(lambda x: len(x) >= MIN_LOCNI_COUNT).reset_index(drop=True)
    merged_summary = summarize(merged,['Locality', 'Region'])
    merged_summary_file = os.path.join(BUILD,'merged_summary.csv')
    merged_summary.to_csv(merged_summary_file, index=False)
    corrected = os.path.join(BUILD,'re_data_corrected.csv')
    unmatched_records = os.path.join(BUILD,'unmatched_records.csv')
    unmatched_summary = os.path.join(BUILD,'unmatched_summary.csv')
    yaml_file = os.path.join(BUILD,'re_script.yml')
    dir_path = os.path.join(BUILD,'us')
    unmerged.to_csv(unmatched_records, index=False)
    unmerged_summary.to_csv(unmatched_summary, index=False)
    merged = merged[(merged['Region'].str.strip() != '') & (merged['Locality'].str.strip() != '')]
    merged.to_csv(corrected, index=False)
    yaml_data = group_and_save_csv(merged, dir_path, "real-estate-agents")
    save_yaml(yaml_data, yaml_file)
    execute_yaml_structure(yaml_data)
def abbreviations(Locality_df):
    replacements = ['Saint', 'Mount', 'Fort']
    for replacement in replacements:
        abbreviation = replacement[0].lower() + 't'
        pattern = rf'\b{abbreviation}\.(?=\s)|\b{abbreviation}(?=\s)'
        Locality_df['Locality'] = Locality_df['Locality'].str.replace(pattern, replacement, regex=True, case=False)
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('Locality')
    parser.add_argument('locality')
    parser.add_argument('postal')
    args = parser.parse_args()
    Locality = args.Locality
    locality = args.locality
    postal = args.postal
    main(Locality, locality, postal)