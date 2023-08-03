import uuid
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model


class OTTERInference(Model):
    __keyspace__ = "spam_inferences" 
    uuid = columns.UUID(primary_key=True, default=uuid.uuid1) #uuid.uuid1 -> timestamp
    rna_sequence = columns.Text(index=True)
    # label = columns.Text()
    binding_score = columns.Float()