from PyPDF2 import PdfReader
import pandas as pd
import re

# ---------------- CONFIG ----------------
pdf_path = r"C:\Users\SACHINDEVA\Downloads\BNS.pdf"
output_csv = "bns_structured_sections.csv"
# ---------------------------------------

reader = PdfReader(pdf_path)

# Read all text from PDF
text = ""
for page in reader.pages:
    t = page.extract_text()
    if t:
        text += t + "\n"

lines = [l.strip() for l in text.split("\n") if l.strip()]

records = []

current_chapter = ""
current_topic = ""
waiting_for_chapter_title = False

# Matches: 1, 12, 213, 213A, 213B, 376AB, etc.
section_pattern = re.compile(r"^(\d+[A-Z]{0,2})\.\s*(.*)")

# Start from 10001 to avoid collision with real IPC section numbers
section_id = 10001  

for line in lines:

    # 1. Detect CHAPTER line
    if line.startswith("CHAPTER"):
        waiting_for_chapter_title = True
        current_topic = ""
        continue

    # 2. Capture chapter title ONLY after CHAPTER
    if waiting_for_chapter_title:
        current_chapter = line.strip()
        waiting_for_chapter_title = False
        continue

    # 3. Detect topic bullet
    if line.startswith("•"):
        current_topic = line.replace("•", "").strip()
        continue

    # 4. Detect section numbers
    match = section_pattern.match(line)
    if match:
        section_number = match.group(1)
        title = match.group(2)

        # Description format: Chapter : Topic
        if current_topic:
            description = f"{current_chapter} : {current_topic}"
        else:
            description = current_chapter

        records.append({
            "section_id": section_id,
            "act_name": "IPC",
            "chapter": current_chapter,
            "section_number": section_number,
            "title": title,
            "description": description
        })

        section_id += 1


# Convert to CSV
df = pd.DataFrame(records)
df.to_csv(output_csv, index=False, encoding="utf-8")

print("CSV file created successfully:", output_csv)
