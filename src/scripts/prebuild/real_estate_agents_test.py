import pytest
import pandas as pd
from real_estate_agents import abbreviations
from provider  import sanitize, remove_diacritics
@pytest.mark.parametrize("input,expected",
    [
        ("New York", "new-york"),
        ("San Francisco", "san-francisco"),
        ("Paris", "paris"),
        ("Café", "cafe"),
        ("Berlin123", "berlin123"),
        ("Los Angeles!", "los-angeles"),
        ("Hello@World", "helloworld"),
        ("Multi   Space", "multi---space"),
        ("already-clean", "already-clean"),
        ("", ""),
        ("!@#$%^&*()", "")
    ])
def test_sanitize(input, expected):
    actual = sanitize(input)
    assert actual == expected
@pytest.mark.parametrize(
    "input,expected",
    [
        ('St. Louis', 'Saint Louis'),
        ('ST. Paul', 'Saint Paul'),
        ('st. Charles', 'Saint Charles'),
        ('St Mary', 'Saint Mary'),
        ('vern Mt Vernon', 'vern Mount Vernon'),
        ('MT Washington', 'Mount Washington'),
        ('mt sT. Helens', 'Mount Saint Helens'),
        ('Ft. Worth', 'Fort Worth'),
        ('FT. Lauderdale', 'Fort Lauderdale'),
        ('ft. Knox', 'Fort Knox'),
        ('ftdear', 'ftdear'),
        ('ft.born', 'ft.born')
    ]
)
def test_abbreviation_case(input, expected):
    input_df = pd.DataFrame({'Locality': [input]})
    expected_df = pd.DataFrame({'Locality': [expected]})
    abbreviations(input_df)
    pd.testing.assert_frame_equal(input_df, expected_df)
@pytest.mark.parametrize(
    "input, expected",
    [
        ("Café", "Cafe"),
        ("élève", "eleve"),
        ("résumé", "resume"),
        ("coöperate", "cooperate"),
        ("Málaga is a beautiful city.", "Malaga is a beautiful city."),
        ("Niño plays in the park.", "Nino plays in the park."),
        ("Python", "Python"),
        ("Testing 123!", "Testing 123!"),
        ("", ""),
        ("Ångström and Øresund", "Angstrom and Oresund"),
        ("São Tomé and Príncipe", "Sao Tome and Principe"),
        ("école", "ecole"),
        ("ñandú", "nandu"),
    ]
)
def test_remove_diacritics(input, expected):
    actual = remove_diacritics(input)
    assert actual == expected