import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

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