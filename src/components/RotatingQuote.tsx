import { useEffect, useState } from 'react';
import { MEDICAL_QUOTES } from '../data/quotes';

const ROTATE_INTERVAL_MS = 60_000;

export default function RotatingQuote() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * MEDICAL_QUOTES.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % MEDICAL_QUOTES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-center">
      <p key={index} className="animate-fade-in-up text-xs font-medium leading-relaxed text-emerald-700">
        “{MEDICAL_QUOTES[index]}”
      </p>
    </div>
  );
}
