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

# 1. מאגר המידע שלך - הוספתי כאן את המידע על חנק כדי שהמודל באמת ידע לענות עליו!
my_knowledge_base = [
    "אם אדם נחנק בקש ממנו להשתעל.",
    "כדי לאפס את הסיסמה, יש לנווט להגדרות > אבטחה וללחוץ על 'איפוס'.",
    "האפליקציה שלנו משתמשת בבסיס נתונים מסוג PostgreSQL שמארח באופן מקומי.",
    "במקרה של חנק (תמרון היימליך): ודא שהאדם משתעל. אם אינו נושם, בצע לחיצות בבטן העליונה כלפי מעלה ומאחוריו עד שהחסימה תשתחרר."
]
documents = [Document(page_content=text) for text in my_knowledge_base]

# אתחול המודלים
try:
    print("Loading embedding model...")
    local_embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    print("Building vector database...")
    vectorstore = Chroma.from_documents(documents=documents, embedding=local_embeddings)
    # נגדיר את הציון (Score) המינימלי כדי לסנן מידע לא קשור
    retriever = vectorstore.as_retriever(search_kwargs={"k": 1})
    
    print("Loading tiny LLM model...")
    llm = Ollama(model="qwen2.5:0.5b", temperature=0.0, num_predict=80)
    print("System successfully loaded!")
except Exception as e:
    print(f"CRITICAL ERROR DURING INITIALIZATION: {str(e)}")
    retriever = None
    llm = None

class QueryRequest(BaseModel):
    question: str

@app.post("/api/chat")
async def ask_chatbot(payload: QueryRequest):
    if llm is None or retriever is None:
        return {"answer": "מערכת ה-AI לא אותחלה כראוי ברקע."}
        
    try:
        # 1. שליפת פיסת המידע הכי קרובה יחד עם ציון הדמיון שלה
        question = payload.question.strip()
        matched_docs = vectorstore.similarity_search_with_score(question, k=1)
        
        # אם מסד הנתונים ריק או שאין שום קשר למידע הקיים שלנו
        # (בכרומה, ככל שהציון נמוך יותר, המידע קרוב יותר. מעל 1.2 זה בדרך כלל ניחוש מוחלט)
        if not matched_docs or matched_docs[0][1] > 1.2:
            return {"answer": "אינני יודע את התשובה מתוך המידע שסופק."}
            
        context = matched_docs[0][0].page_content

        # 2. פרומפט פשוט ומזוקק שמתאים למודל של 390MB (בלי תגיות מערכת מסובכות)
        prompt = f"""דבר רק עברית. תענה על השאלה בקצרה רק לפי המידע המצורף. אם השאלה לא קשורה למידע, תגיד "אינני יודע".

מידע: {context}
שאלה: {question}
תשובה:"""

        # 3. קבלת התשובה במהירות הבזק
        response_text = llm.invoke(prompt).strip()
        return {"answer": response_text}
        
    except Exception as e:
        return {"answer": f"שגיאה בעיבוד הבקשה: {str(e)}"}