import { useCallback, useRef, useState } from 'react';
import { transcribeAudio } from '../services/transcriptionService';

export type VoiceRecordingState = 'idle' | 'recording' | 'uploading' | 'error';

interface UseVoiceRecorderOptions {
  /** נקרא עם הטקסט המתומלל לאחר שהשרת מחזיר תשובה תקינה ולא ריקה */
  onTranscribed: (text: string) => void;
}

interface UseVoiceRecorderResult {
  state: VoiceRecordingState;
  errorMessage: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

/**
 * הוק להקלטת קול מהמיקרופון, שליחתו לתמלול בשרת המקומי, והחזרת הטקסט שהתקבל.
 * אחראי על ניהול מצב ההקלטה וניקוי ה-MediaStream בכל מקרה (הצלחה/שגיאה).
 */
export function useVoiceRecorder({ onTranscribed }: UseVoiceRecorderOptions): UseVoiceRecorderResult {
  const [state, setState] = useState<VoiceRecordingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const stopMediaTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    setErrorMessage(null);

    let stream: MediaStream;
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        // קורה כשהדף נטען מחיבור לא מאובטח (לא https ולא localhost) - הדפדפן חוסם את ה-API לגמרי
        throw new DOMException('getUserMedia is unavailable in this context', 'SecurityError');
      }
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Microphone access failed:', error);

      const name = error instanceof DOMException ? error.name : '';
      let message = 'לא ניתן היה לגשת למיקרופון. נסו שוב.';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        message = 'הגישה למיקרופון נדחתה. יש לאשר הרשאת מיקרופון בהגדרות הדפדפן (ולעיתים גם בהגדרות הפרטיות של המערכת) ולנסות שוב.';
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        message = 'לא נמצא מיקרופון במכשיר.';
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        message = 'המיקרופון תפוס על ידי תוכנה אחרת. סגרו אותה ונסו שוב.';
      } else if (name === 'SecurityError') {
        message = 'גישה למיקרופון אפשרית רק בחיבור מאובטח (HTTPS) או ב-localhost.';
      }

      setErrorMessage(message);
      setState('error');
      return;
    }

    streamRef.current = stream;

    // audio/webm מועדף כי Whisper תומך בו ישירות; נופלים חזרה לברירת המחדל של הדפדפן אם לא נתמך
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      stopMediaTracks();

      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
      chunksRef.current = [];

      if (blob.size === 0) {
        setErrorMessage('לא נקלט שמע. נסו שוב.');
        setState('error');
        return;
      }

      void (async () => {
        setState('uploading');
        try {
          const text = await transcribeAudio(blob);
          if (!text.trim()) {
            setErrorMessage('לא זוהה טקסט בהקלטה. נסו לדבר בבירור ולהקליט שוב.');
            setState('error');
            return;
          }

          onTranscribed(text.trim());
          setState('idle');
        } catch (error) {
          console.error('Transcription upload failed:', error);
          setErrorMessage('שליחת ההקלטה נכשלה. ודאו ששרת הפייתון המקומי פועל ונסו שוב.');
          setState('error');
        }
      })();
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setState('recording');
  }, [onTranscribed, stopMediaTracks]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
  }, []);

  return { state, errorMessage, startRecording, stopRecording };
}
