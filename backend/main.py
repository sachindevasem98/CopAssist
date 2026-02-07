from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from bns_search import search_bns_sections

app = FastAPI(title="CopAssist BNS API")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ComplaintRequest(BaseModel):
    complaint_text: str


@app.get("/")
def health_check():
    return {"status": "CopAssist backend running"}


@app.post("/analyze")
def analyze_complaint(request: ComplaintRequest):
    results = search_bns_sections(request.complaint_text)
    return {
        "complaint": request.complaint_text,
        "results": results
    }
