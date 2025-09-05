import re
import pytesseract
from PIL import Image
import cv2
import tempfile
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import logging
import os
import httpx
import random
from fastapi.responses import JSONResponse

# No need for dotenv on Render — use Render's env vars instead
# load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../vite-project/.env"))

# On Render (Linux), Tesseract is installed system-wide
# pytesseract will automatically find it, so remove Windows path setting
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://loansimp-lify.onrender.com"],  # you can restrict to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== OCR Regex Patterns ==========
aadhaar_pattern = re.compile(r"^\d{4}\s\d{4}\s\d{4}$")
pan_pattern = re.compile(r"^[A-Z]{5}[0-9]{4}[A-Z]$")
apaar_pattern = re.compile(r"^\d{12}$")

# Cleaner name extraction
name_patterns = [
    re.compile(r"(?:name|full name|नाम|फुल नेम)[:;\s]*([A-Za-z\s]+)", re.IGNORECASE),
    re.compile(r"^([A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2})$"),
]

dob_patterns = [
    re.compile(r"\b([0-9]{1,2}[/\-\.][0-9]{1,2}[/\-\.][0-9]{2,4})\b"),
    re.compile(r"\b([0-9]{4}[/\-\.][0-9]{1,2}[/\-\.][0-9]{1,2})\b"),
]

gender_patterns = [
    re.compile(r"(?:gender|लिंग|जेंडर)[:;\s]*(male|female|transgender|m|f|t|पुरुष|महिला|स्त्री|ट्रांसजेंडर)", re.IGNORECASE),
    re.compile(r"\b(male|female|transgender|m|f|t)\b", re.IGNORECASE),
]

# ========== Helpers ==========
def format_date_to_dd_mm_yyyy(date_str):
    formats = [
        '%d/%m/%Y', '%d-%m-%Y', '%d.%m.%Y',
        '%m/%d/%Y', '%m-%d-%Y', '%m.%d.%Y',
        '%Y/%m/%d', '%Y-%m-%d', '%Y.%m.%d',
        '%d/%m/%y', '%d-%m-%y', '%d.%m.%y',
    ]
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime('%d/%m/%Y')
        except ValueError:
            continue
    return date_str

def clean_text_lines(text):
    lines = []
    for l in text.split("\n"):
        l = l.strip()
        if not l:
            continue
        l = re.sub(r"[^A-Za-z0-9\s:/\-\.]", "", l)
        l = re.sub(r"\s+", " ", l)
        lines.append(l)
    return lines

def extract_fields(lines):
    details = {}
    for l in lines:
        if any(x in l.lower() for x in ["dob", "date", "birth", "gender"]):
            continue
        for pattern in name_patterns:
            m = pattern.search(l)
            if m:
                details["name"] = m.group(1).strip()
                break
        if "name" in details:
            break
    for l in lines:
        for pattern in dob_patterns:
            m = pattern.search(l)
            if m:
                details["dob"] = format_date_to_dd_mm_yyyy(m.group(1).strip())
                break
        if "dob" in details:
            break
    for l in lines:
        for pattern in gender_patterns:
            m = pattern.search(l)
            if m:
                g = m.group(1).lower()
                details['gender'] = 'Male' if g in ['male','m','पुरुष'] else 'Female' if g in ['female','f','महिला','स्त्री'] else 'Other'
                break
        if "gender" in details:
            break
    return details

def extract_details(text, doc_type):
    lines = clean_text_lines(text)
    return extract_fields(lines)

# ========== OCR Verification Endpoint ==========
@app.post("/verify")
async def verify_document(file: UploadFile = File(...), doc_type: str = Form(...), user_input: str = Form(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        img = cv2.imread(tmp_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        denoised = cv2.fastNlMeansDenoising(gray)
        _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, (2,2))

        text = pytesseract.image_to_string(morph)
        lines = clean_text_lines(text)
        details = extract_fields(lines)

        if doc_type.lower() == "aadhaar":
            for l in lines:
                if aadhaar_pattern.match(l) and l.replace(" ", "") == user_input.replace(" ", ""):
                    return {"status": "Verified","feedback": f"Valid Aadhaar detected: {l}","details": details}
            return {"status":"Rejected","feedback":"No valid Aadhaar number detected or mismatch"}

        if doc_type.lower() == "pan":
            for l in lines:
                if pan_pattern.match(l) and l == user_input:
                    return {"status": "Verified","feedback": f"Valid PAN detected: {l}","details": details}
            return {"status":"Rejected","feedback":"No valid PAN number detected or mismatch"}

        if doc_type.lower() == "apaar":
            for l in lines:
                digits = re.sub(r'\D','',l)
                if apaar_pattern.match(digits) and digits == user_input:
                    return {"status": "Verified","feedback": f"Valid APAAR detected: {digits}","details": details}
            return {"status":"Rejected","feedback":"No valid APAAR ID detected or mismatch"}

        return {"status": "Rejected", "feedback": "Unknown document type"}
    except Exception as e:
        return {"status": "Rejected", "feedback": f"Server error: {str(e)}"}

# ========== Chatbot Route ==========
class ChatRequest(BaseModel):
    messages: list

@app.post("/api/chat")
async def chatbot(req: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}", "Content-Type": "application/json"},
                json={"model": "llama-3.1-8b-instant", "messages": req.messages},
            )
        return resp.json()
    except Exception as e:
        return {"error": f"Chatbot error: {str(e)}"}

# ========== OTP Verification ==========
active_user = None
otp_store = {}

def generate_otp():
    return str(random.randint(100000, 999999))

@app.middleware("http")
async def one_user_lock(request: Request, call_next):
    global active_user
    client_ip = request.client.host
    if active_user is None:
        active_user = client_ip
    if client_ip != active_user:
        return JSONResponse(status_code=403, content={"error": "Verification locked. Only one person allowed."})
    return await call_next(request)

@app.post("/api/verify/aadhar")
async def verify_aadhar(req: dict):
    aadhar = req.get("aadharNumber")
    if not aadhar or len(aadhar) != 12:
        return {"error":"Invalid Aadhaar number"}
    otp = generate_otp()
    otp_store["aadhar"] = {"otp": otp, "verified": False}
    print(f"📩 Aadhaar OTP for {aadhar}: {otp}")
    return {"message": "OTP sent for Aadhaar verification"}

@app.post("/api/verify/aadhar/otp")
async def verify_aadhar_otp(req: dict):
    otp = req.get("otp")
    if otp_store.get("aadhar") and otp_store["aadhar"]["otp"] == otp:
        otp_store["aadhar"]["verified"] = True
        return {"message":"Aadhaar verified successfully ✅"}
    return {"error":"Invalid OTP for Aadhaar ❌"}

@app.post("/api/verify/pan")
async def verify_pan(req: dict):
    pan = req.get("panNumber")
    if not pan or len(pan) != 10:
        return {"error":"Invalid PAN number"}
    otp = generate_otp()
    otp_store["pan"] = {"otp": otp, "verified": False}
    print(f"📩 PAN OTP for {pan}: {otp}")
    return {"message":"OTP sent for PAN verification"}

@app.post("/api/verify/pan/otp")
async def verify_pan_otp(req: dict):
    otp = req.get("otp")
    if otp_store.get("pan") and otp_store["pan"]["otp"] == otp:
        otp_store["pan"]["verified"] = True
        return {"message":"PAN verified successfully ✅"}
    return {"error":"Invalid OTP for PAN ❌"}

@app.post("/api/verify/dl")
async def verify_dl(req: dict):
    dl = req.get("dlNumber")
    if not dl or len(dl) < 8:
        return {"error":"Invalid DL number"}
    otp = generate_otp()
    otp_store["dl"] = {"otp": otp, "verified": False}
    print(f"📩 DL OTP for {dl}: {otp}")
    return {"message":"OTP sent for DL verification"}

@app.post("/api/verify/dl/otp")
async def verify_dl_otp(req: dict):
    otp = req.get("otp")
    if otp_store.get("dl") and otp_store["dl"]["otp"] == otp:
        otp_store["dl"]["verified"] = True
        return {"message":"Driving License verified successfully ✅"}
    return {"error":"Invalid OTP for DL ❌"}

@app.post("/api/reset-verification")
async def reset_verification():
    global active_user, otp_store
    active_user = None
    otp_store = {}
    return {"message":"Verification system reset. Next person can verify now."}



