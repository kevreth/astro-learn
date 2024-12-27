import os
import pandas as pd

directory = 'us/'
required_columns = [
    "Code", "Name", "URL", "Phone", "Email", "Street", 
    "Locality", "Region", "Postal", "Country", "Log", "Source"
]
resorted_columns = [
    "Name", "URL", "Phone", "Email", "Street", "Locality", 
    "Region", "Postal", "Country", "Niche", "Log"
]
combined_df = []

for root, _, files in os.walk(directory):
    print(root)
    for file in files:
        if file.endswith('.csv'):
            file_path = os.path.join(root, file)
            df = pd.read_csv(file_path, dtype='str')
            df = df[[col for col in required_columns if col in df.columns]]
            if list(df.columns) == required_columns:
                df = df.dropna(subset=['Region', 'Locality'])
                last_segment = os.path.basename(root)
                print(last_segment)
                df['Niche'] = last_segment
                df = df.drop(columns=["Code", "Source"])
                df = df[[col for col in resorted_columns if col in df.columns]]
                combined_df.append(df)
            else:
                print(f"File {file_path} does not have the required columns.")

if combined_df:
    final_df = pd.concat(combined_df, ignore_index=True)
    final_df = final_df.sort_values(by=['Region', 'Locality', 'Niche', 'Name'])
    final_df.to_csv('combined_output.csv', index=False)
