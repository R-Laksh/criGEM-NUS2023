import pathlib
from typing import Optional
from fastapi import FastAPI

app = FastAPI()

BASE_DIR = pathlib.Path(__file__).resolve().parent

MODEL_DIR = BASE_DIR.parent / "models"
OTTER_MODEL_DIR= MODEL_DIR / "otter"
MODEL_PATH = OTTER_MODEL_DIR / "spam-model.h5"
TOKENIZER_PATH = OTTER_MODEL_DIR / "spam-classifier-tokenizer.json"
METADATA_PATH = OTTER_MODEL_DIR / "spam-classifier-metadata.json"

@app.get("/") # /?q=lmao
def read_index(q:Optional[str] = None):
    query = q or "hello world"
    # predict(query)
    return {"query": query}

