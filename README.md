# 🚓 CopAssist – Police FIR AI Assistant

CopAssist is an AI-powered assistance system designed to help police officers map real-world complaints to relevant **Bharatiya Nyaya Sanhita (BNS)** sections quickly and accurately.

The project focuses on **semantic search using embeddings and FAISS**, enabling intelligent retrieval of legal sections based on natural-language complaints.

---

## ✨ Key Features

- 🔍 **Semantic Complaint Search**
  - Converts FIR-style complaints into embeddings
  - Retrieves the most relevant BNS sections using FAISS similarity search

- 📚 **Structured Legal Dataset**
  - BNS sections extracted, cleaned, and structured from official documents
  - Metadata stored alongside embeddings for accurate context

- ⚡ **Fast & Offline Search**
  - FAISS index allows millisecond-level search
  - No external API dependency during inference

- 🧠 **AI-Ready Architecture**
  - Easily extendable to full backend + authentication
  - Designed to integrate with a future police-only system

- 🎨 **Frontend Prototype**
  - Simple React-based UI to test complaint input and search output

---

## 🏗️ Project Structure
CopAssist/
│
├── bns_pdf_to_csv.py # Converts BNS PDF to structured CSV
├── bns_structured_sections.csv# Cleaned & structured BNS data
│
├── bns_embedding.py # Generates embeddings for BNS sections
├── bns_faiss.index # FAISS index for fast similarity search
├── bns_metadata.pkl # Metadata mapping for FAISS results
│
├── bns_search.py # Core semantic search logic
│
├── frontend.jsx # Frontend prototype (React)
│
└── README.md # Project documentation


---

## 🧠 How It Works

1. **Legal Data Preparation**
   - BNS sections are extracted from official PDFs
   - Cleaned and stored in a structured CSV

2. **Embedding Generation**
   - Each section is converted into a vector embedding
   - Stored inside a FAISS index for similarity search

3. **Complaint Search**
   - User enters a natural-language complaint
   - Complaint is embedded and searched against FAISS
   - Most relevant legal sections are returned

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- FAISS
- NumPy, Pandas
- Sentence Transformers / compatible embedding model

🛠️ Tech Stack

Python

FAISS (Facebook AI Similarity Search)

Sentence Embeddings

React (Frontend Prototype)
