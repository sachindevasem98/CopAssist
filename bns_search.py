import faiss
import pickle
from sentence_transformers import SentenceTransformer

# -------- CONFIG --------
FAISS_INDEX_PATH = "bns_faiss.index"
METADATA_PATH = "bns_metadata.pkl"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 5
# ------------------------

print("Loading FAISS index...")
index = faiss.read_index(FAISS_INDEX_PATH)

print("Loading metadata...")
with open(METADATA_PATH, "rb") as f:
    metadata = pickle.load(f)

print("Loading embedding model...")
model = SentenceTransformer(EMBEDDING_MODEL)

def confidence_label(score):
    if score <= 1.2:
        return "HIGH"
    elif score <= 1.6:
        return "MEDIUM"
    else:
        return "LOW"

OFFENCE_CATEGORIES = {
    "HOMICIDE": ["murder", "culpable homicide", "death"],
    "ASSAULT": ["hurt", "grievous", "assault", "injury"],
    "THEFT": ["theft", "stolen", "snatching"],
    "ROBBERY": ["robbery", "dacoity", "loot"],
    "SEXUAL": ["rape", "sexual", "molestation"],
    "KIDNAPPING": ["kidnap", "abduct"],
    "CHEATING": ["cheating", "fraud", "dishonest"],
    "CRIMINAL_FORCE": ["force", "threat", "intimidation"]
}

def detect_case_type(complaint_text):
    text = complaint_text.lower()

    for category, keywords in OFFENCE_CATEGORIES.items():
        for kw in keywords:
            if kw in text:
                return category

    return "GENERAL"

def apply_legal_reasoning(results, complaint_text):
    case_type = detect_case_type(complaint_text)

    for r in results:
        title = r["title"].lower()

        # HOMICIDE LOGIC
        if case_type == "HOMICIDE":
            if "murder" in title:
                r["similarity_score"] -= 0.3
            elif "culpable homicide" in title:
                r["similarity_score"] -= 0.2

        # THEFT LOGIC
        elif case_type == "THEFT":
            if "theft" in title:
                r["similarity_score"] -= 0.3
            elif "robbery" in title:
                r["similarity_score"] -= 0.1

        # SEXUAL OFFENCES
        elif case_type == "SEXUAL":
            if "rape" in title:
                r["similarity_score"] -= 0.3
            elif "molestation" in title:
                r["similarity_score"] -= 0.2

        # CHEATING / FRAUD
        elif case_type == "CHEATING":
            if "cheating" in title or "fraud" in title:
                r["similarity_score"] -= 0.3

    results.sort(key=lambda x: x["similarity_score"])
    return results



def search_bns_sections(complaint_text):
    query_embedding = model.encode([complaint_text])
    distances, indices = index.search(query_embedding, TOP_K)

    results = []
    for rank, idx in enumerate(indices[0]):
        section = metadata[idx]
        score = float(distances[0][rank])
        confidence = confidence_label(score)

        results.append({
            "rank": rank + 1,
            "section_number": section["section_number"],
            "title": section["title"],
            "description": section["description"],
            "similarity_score": score,
            "confidence": confidence
        })

    return results



# -------- TEST --------
if __name__ == "__main__":
    complaint = input("\nEnter complaint text: ")
    matches = search_bns_sections(complaint)
    matches = apply_legal_reasoning(matches, complaint)


    print("\n🔎 Suggested BNS Sections:\n")
    for m in matches:
        print(
            f"Rank {m['rank']} | "
            f"BNS {m['section_number']} | "
            f"{m['title']} | "
            f"Confidence: {m['confidence']} | "
            )
