import pandas as pd
from provider import sanitize, remove_diacritics, group_and_save_csv, execute_yaml_structure
def test_remove_diacritics():
    assert remove_diacritics("Ångström") == "Angstrom"
    assert remove_diacritics("Øresund") == "Oresund"
    assert remove_diacritics("Æble") == "AEble"
def test_sanitize():
    assert sanitize("New York") == "new-york"
    assert sanitize("São Paulo") == "sao-paulo"
    assert sanitize("Café") == "cafe"
def test_group_and_save_csv(tmp_path):
    df = pd.DataFrame({
        "Region": ["North", "North"],
        "Locality": ["City A", "City A"],
        "Niche": ["N1", "N2"],
        "Value": [1, 2]
    })
    output_dir = tmp_path / "output"
    result = group_and_save_csv(df, output_dir, None)
    print(result)
    assert "North" in result
    assert "City A" in result["North"]
    details = result["North"]["City A"]
    assert details["create_directory"]
    print(details["file"])
    assert details["file"].endswith("n2/content.csv")
