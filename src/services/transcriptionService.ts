/**
 * שולח קובץ שמע שהוקלט בדפדפן לשרת הפייתון המקומי לתמלול (Whisper מקומי).
 * מחזיר את הטקסט המתומלל, או זורק שגיאה אם השרת לא הגיב כראוי.
 */
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const response = await fetch('/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`שרת התמלול החזיר סטטוס שגיאה: ${response.status}`);
  }

  const data = await response.json();
  return typeof data.text === 'string' ? data.text : '';
}
