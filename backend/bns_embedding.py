import pandas as pd
import faiss
from sentence_transformers import SentenceTransformer
import pickle

# -------- CONFIG --------
CSV_PATH = r"D:\CopAssist\bns_structured_sections.csv"   # your BNS CSV
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
FAISS_INDEX_PATH = "bns_faiss.index"
METADATA_PATH = "bns_metadata.pkl"
# ------------------------

print("Loading dataset...")
df = pd.read_csv(CSV_PATH)

# Ensure section_number is treated as text
df["section_number"] = df["section_number"].astype(str)

# Combine meaningful fields for embedding
df["embedding_text"] = df["title"] + ". " + df["description"]

texts = df["embedding_text"].tolist()

print("Loading embedding model...")
model = SentenceTransformer(EMBEDDING_MODEL)

print("Generating embeddings...")
embeddings = model.encode(texts, show_progress_bar=True)

dimension = embeddings.shape[1]

print("Creating FAISS index...")
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

print("Saving FAISS index...")
faiss.write_index(index, FAISS_INDEX_PATH)

print("Saving metadata...")
metadata = df[[
    "section_id",
    "section_number",
    "title",
    "description"
]].to_dict(orient="records")

with open(METADATA_PATH, "wb") as f:
    pickle.dump(metadata, f)

print("✅ Embedding & indexing completed successfully!")
