import io
import json
import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from faster_whisper import WhisperModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. טעינת מאגר המידע מקובץ ה-JSON החיצוני
try:
    json_path = os.path.join(os.path.dirname(__file__), "knowledge_base.json")
    with open(json_path, "r", encoding="utf-8") as f:
        my_knowledge_base = json.load(f)
    print(f"Successfully loaded {len(my_knowledge_base)} guidelines from JSON file!")
except Exception as e:
    print(f"ERROR LOADING JSON FILE: {str(e)}")
    # רשת ביטחון למקרה שהקובץ חסר או פגום
    my_knowledge_base = ["במקרה של אדם שנחנק לידך בקש ממנו להשתעל מיד"]

documents = [Document(page_content=text) for text in my_knowledge_base]

# אתחול המודלים המקומיים של Ollama
try:
    print("Loading embedding model...")
    local_embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    print("Building vector database...")
    vectorstore = Chroma.from_documents(documents=documents, embedding=local_embeddings)
    
    print("Loading tiny LLM model...")
    llm = Ollama(model="qwen2.5:0.5b", temperature=0.0, num_predict=80)
    print("System successfully loaded!")
except Exception as e:
    print(f"CRITICAL ERROR DURING INITIALIZATION: {str(e)}")
    vectorstore = None
    llm = None

# מודל זיהוי דיבור מקומי (Whisper) להמרת הקלטות קוליות לטקסט
try:
    print("Loading speech-to-text model...")
    whisper_model = WhisperModel("tiny", device="cpu", compute_type="int8")
    print("Speech-to-text model loaded!")
except Exception as e:
    print(f"ERROR LOADING WHISPER MODEL: {str(e)}")
    whisper_model = None

class QueryRequest(BaseModel):
    question: str

@app.post("/api/chat")
async def ask_chatbot(payload: QueryRequest):
    if vectorstore is None:
        return {"answer": "מערכת ה-AI לא אותחלה כראוי ברקע."}
        
    try:
        question = payload.question.strip()
        
        # שלב 1: שליפת המשפט הספציפי (k=1)
        matched_docs = vectorstore.similarity_search_with_score(question, k=1)
        
        # סינון לפי רף הציון המקומי של המודל
        if not matched_docs or matched_docs[0][1] > 300.0:
            return {"answer": "אינני יודע את התשובה מתוך המידע שסופק."}
            
        context = matched_docs[0][0].page_content
        
        # הדפסת דיבאג לטרמינל
        print(f"User asked: '{question}' | Best match: '{context}' | Score: {matched_docs[0][1]}")

        # שלב 2: החזרת התשובה הספציפית המדויקת ישירות ל-React
        return {"answer": context}
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return {"answer": f"שגיאה בעיבוד הבקשה: {str(e)}"}


@app.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    if whisper_model is None:
        return JSONResponse(status_code=503, content={"text": "", "error": "מודל זיהוי הדיבור לא נטען כראוי בשרת."})

    try:
        audio_bytes = await audio.read()
        if not audio_bytes:
            return JSONResponse(status_code=400, content={"text": "", "error": "לא התקבל קובץ שמע."})

        # faster-whisper יודע לקרוא ישירות מ-buffer בזיכרון (ללא צורך בשמירת קובץ זמני)
        audio_buffer = io.BytesIO(audio_bytes)
        segments, _ = whisper_model.transcribe(audio_buffer, language="he")
        text = " ".join(segment.text.strip() for segment in segments).strip()

        return {"text": text}

    except Exception as e:
        print(f"Error in transcribe endpoint: {str(e)}")
        return JSONResponse(status_code=500, content={"text": "", "error": f"שגיאה בעיבוד השמע: {str(e)}"})