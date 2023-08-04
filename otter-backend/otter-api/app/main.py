import os
import pathlib
from typing import Optional
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

from cassandra.query import SimpleStatement

from cassandra.cqlengine.management import sync_table

from . import (
    config, 
    db, 
    models,
    ml,
    schema
)

app = FastAPI()
settings = config.get_settings()

BASE_DIR = pathlib.Path(__file__).resolve().parent

MODEL_DIR = BASE_DIR.parent / "models"
OTTER_MODEL_DIR = MODEL_DIR / "otter"
MODEL_PATH = OTTER_MODEL_DIR / "spam-model.h5"
TOKENIZER_PATH = OTTER_MODEL_DIR / "spam-classifer-tokenizer.json"
METADATA_PATH = OTTER_MODEL_DIR / "spam-classifer-metadata.json"

AI_MODEL = None
DB_SESSION = None
OTTERInference = models.OTTERInference

@app.on_event("startup")
def on_startup():
    global AI_MODEL, DB_SESSION
    AI_MODEL = ml.AIModel(
        model_path= MODEL_PATH,
        tokenizer_path = TOKENIZER_PATH,
        metadata_path = METADATA_PATH
    )
    DB_SESSION = db.get_session()
    sync_table(OTTERInference)

@app.get("/")
def read_index(q: Optional[str] = None):
    print("Received RNA sequence:", q)

    if q is None:
        print("Error: RNA sequence not provided.")
        return {"error": "Please provide an RNA sequence (q parameter)"}

    # Predict binding score using the machine learning model
    global AI_MODEL
    preds_dict = AI_MODEL.predict_text(q)
    print("Predicted values:", preds_dict)
    top = preds_dict.get('top')
    
    # Debugging statements
    print("Type of top:", type(top))
    print("Keys in top:", top.keys())

    binding_score = top.get('binding_score')
    print("Binding Score:", binding_score)

    return {"rna_sequence": q, "binding_score": binding_score}

    

@app.post("/") 
def create_inference(query:schema.Query):
    global AI_MODEL
    # query = q or "hello world"
    preds_dict = AI_MODEL.predict_text(query.q)
    top = preds_dict.get('top') # {label:, conf}
    data = {"rna_sequence": query.q, **top}
    obj = OTTERInference.objects.create(**data)
    # NoSQL -> cassandra -> DataStax AstraDB
    return obj

@app.get("/inferences") # /?q=this is awesome
def list_inference():
    q = OTTERInference.objects.all()
    print(q)
    return list(q)

@app.get("/inferences/{my_uuid}") # /?q=this is awesome
def read_inference(my_uuid):
    obj = OTTERInference.objects.get(uuid=my_uuid)
    return obj

def fetch_rows(
        stmt:SimpleStatement, 
        fetch_size:int = 25, 
        session=None):
    stmt.fetch_size = fetch_size
    result_set = session.execute(stmt)
    has_pages = result_set.has_more_pages
    yield "uuid,binding_score,rna_sequence,version\n"
    while has_pages:
        for row in result_set.current_rows:
            yield f"{row['uuid']},{row['binding_score']},{row['rna_sequence']}, {row['model_version']}\n"
        has_pages = result_set.has_more_pages
        result_set = session.execute(stmt, paging_state=result_set.paging_state)


@app.get("/dataset") # /?q=this is awesome
def export_inferences():
    global DB_SESSION
    cql_query = "SELECT * FROM spam_inferences.otterinference LIMIT 10000"
    statement = SimpleStatement(cql_query)
    # rows = DB_SESSION.execute(cql_query)
    return StreamingResponse(fetch_rows(statement, 25, DB_SESSION))