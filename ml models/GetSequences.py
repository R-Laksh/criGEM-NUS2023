import requests
from bs4 import BeautifulSoup
import subprocess
from Bio import SeqIO
from io import StringIO
import json
import numpy as np
import time


with open("/home/users/nus/e0969999/scratch/data/myfile.json", "r") as file:
    trf_data = json.load(file)

with open("/home/users/nus/e0969999/scratch/data/ncbi_dict.json","r") as file:
    ncbi_data = json.load(file)

# Counter variables
mirbase_counter = 0
ensembl_counter = 0
sequences_per_sleep = 1000  

def getMIRBaseSeq(id):
    global mirbase_counter
    id = id.replace('miRBase:', '')
    URL = "https://www.mirbase.org/mature/" + id
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    sequence_td = soup.find('td', class_='row-title', text='Sequence')
    if sequence_td is None:
        return np.nan
    else:
        sequence = sequence_td.find_next_sibling('td').text.strip()
        mirbase_counter += 1
        if mirbase_counter % sequences_per_sleep == 0:
            time.sleep(5)  
        return sequence

def getTRFdbSeq(id):
    id = id.replace('tRF-','')
    return trf_data.get(id, np.nan)

def getNCBISeq(id):
    id = id.replace('NCBI:', '')
    return ncbi_data.get(id, np.nan)
    
    '''
    command = f"echo '{gene_id}' | source /home/users/nus/e0969999/scratch/ncbi.sh"

    try:
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
        output_file = StringIO(output)
        records = list(SeqIO.parse(output_file, "fasta"))
        if records:
            dna_sequence = str(records[0].seq)
            return dna_sequence
        else:
            return np.nan
    except subprocess.CalledProcessError as e:
        # Handle any errors that occur during script execution
        print("Error executing the script:", e)
    '''
def getEnsemblSeq(id):
    global ensembl_counter
    id = id.replace('Ensembl:','')
    human = "ENSG"
    if human in id:
        server = "https://rest.ensembl.org"
        ext = "/sequence/id/" + id + "?"
        r = requests.get(server+ext, headers={ "Content-Type" : "text/plain"})
        ensembl_counter += 1
        if ensembl_counter % sequences_per_sleep == 0:
            time.sleep(5)
        return r.text
    else:
        return np.nan

def main():
    print("MIRNA:" + getMIRBaseSeq('miRBase:MIMAT0000254'))
    print("tRF:" + getTRFdbSeq('tRF-3001b'))
    print("NCBI:" + getNCBISeq('NCBI:7291'))
    print("Ensembl:" + getEnsemblSeq('Ensembl:ENSG00000266035'))

if __name__ == '__main__':
    main()
