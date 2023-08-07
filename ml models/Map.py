import pandas as pd
from GetSequences import getMIRBaseSeq, getTRFdbSeq, getNCBISeq, getEnsemblSeq 
import numpy as np
import requests
import json

# Create a dictionary to store mapped sequences
sequence_map = {}

def map_raw_id(raw_id, mapping_function):
    try:
        if raw_id in sequence_map:
            seq = sequence_map[raw_id]
            print(seq)
            return seq
        else:
            seq = mapping_function(raw_id)
            print(seq)
            sequence_map[raw_id] = seq
            return seq
    except requests.exceptions.RequestException as e:
        print(f"Error mapping {raw_id}: {e}")
        return np.nan
    except Exception as e:
        print(f"Error mapping {raw_id}: {e}")
        return np.nan

# Mapping functions based on the substring identifiers
mapping_functions = {
    "miRBase": getMIRBaseSeq,
    "tRF": getTRFdbSeq,
    "NCBI": getNCBISeq,
    "Ensembl": getEnsemblSeq
}

def get_mapping_function(raw_id):
    # Determine the mapping function based on the separator
    separator = ":" if ":" in raw_id else "-"
    key = raw_id.split(separator)[0]
    return mapping_functions.get(key, lambda x: np.nan )

# Load the CSV data
input_csv_path = "/home/users/nus/e0969999/scratch/data/filtered_data.csv"
output_csv_path = "/home/users/nus/e0969999/scratch/data/large.csv"
df = pd.read_csv(input_csv_path)

# df = pd.read_csv("/home/users/nus/e0969999/scratch/data/filtered_data.csv")
# df["Mapped_ID1"] = df["Raw_ID1"].apply(lambda x: map_raw_id(x, get_mapping_function(x)))
# df["Mapped_ID2"] = df["Raw_ID2"].apply(lambda x: map_raw_id(x, get_mapping_function(x)))
# df.to_csv("/home/users/nus/e0969999/scratch/data/large.csv")

# Apply mapping functions and handle errors
df["Mapped_ID1"] = df["Raw_ID1"].apply(lambda x: map_raw_id(x, get_mapping_function(x)))
df["Mapped_ID2"] = df["Raw_ID2"].apply(lambda x: map_raw_id(x, get_mapping_function(x)))

# Save the modified DataFrame to CSV
df.to_csv(output_csv_path, index=False)

# After processing, save the sequence_map dictionary as a JSON file
json_file_path = "/home/users/nus/e0969999/scratch/data/sequence_map.json"
with open(json_file_path, 'w') as json_file:
    json.dump(sequence_map, json_file)

