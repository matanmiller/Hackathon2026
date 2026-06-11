/**
 * שולח הודעת חירום למנוע ה-RAG האופליין שרץ מקומית על המחשב (FastAPI).
 * מחזיר הנחיות מובנות ומותאמות בעברית על בסיס הידע שהוזן לו.
 */
export async function sendMessageToAgent(message: string): Promise<string> {
  // בדיקת תקינות בסיסית לקלט ריק
  if (!message.trim()) {
    return 'לא קיבלתי תיאור של המצב. אנא תארו בקצרה מה קורה כעת כדי שאוכל לסייע.';
  }

  try {
    // פנייה לשרת הפייתון המקומי שהרמנו בפורט 8000
    const response = await fetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message.trim() }),
    });

    // בדיקה אם השרת החזיר קוד תקין (200 OK)
    if (!response.ok) {
      throw new Error(`שרת ה-AI החזיר סטטוס שגיאה: ${response.status}`);
    }

    const data = await response.json();
    return data.answer; // מחזיר את התשובה האמיתית של המודל המקומי

  } catch (error) {
    console.error("Error connecting to local AI backend:", error);
    // תשובת מילוט (Fallback) במקרה ששרת הפייתון או אולמה לא דולקים
    return "שגיאה: לא ניתן להתחבר למנוע ה-AI המקומי. ודא ששרת הפייתון (main.py) רץ בטרמינל ושרת Ollama פעיל.";
  }
}