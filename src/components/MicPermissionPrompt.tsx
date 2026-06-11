import { useEffect, useState } from 'react';
import { MicrophoneIcon } from './icons';

const STORAGE_KEY = 'voice-mic-permission-prompted';

/**
 * חלון קופץ שמופיע בפתיחה הראשונה של הצ'אט ומבקש מראש הרשאת מיקרופון,
 * כדי שכפתור ההקלטה יעבוד מיד בלי הפתעות. מוצג פעם אחת בלבד (נשמר ב-localStorage).
 */
export default function MicPermissionPrompt() {
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  const handleAllow = async () => {
    setRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // עוצרים מיד - המטרה הייתה רק להציג את בקשת ההרשאה של הדפדפן מראש
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Microphone permission request failed:', error);
    } finally {
      setRequesting(false);
      dismiss();
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-6">
      <div className="w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
          <MicrophoneIcon className="h-6 w-6" />
        </div>
        <h2 className="mb-1 text-sm font-semibold text-slate-900">גישה למיקרופון</h2>
        <p className="mb-4 text-xs text-slate-500">
          כדי לאפשר שליחת הודעות קוליות לסוכן החירום, יש לאשר גישה למיקרופון.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
          >
            לא עכשיו
          </button>
          <button
            type="button"
            onClick={() => void handleAllow()}
            disabled={requesting}
            className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-sm text-white transition-opacity disabled:opacity-60"
          >
            אפשר גישה
          </button>
        </div>
      </div>
    </div>
  );
}
