# עזרה ראשונה AI

אפליקציית ווב Mobile-First (RTL, עברית) לאימון עזרה ראשונה וקבלת הכוונת חירום מסוכן AI.

נבנה עם React + Vite + TypeScript + Tailwind CSS.

## הרצה מקומית

```bash
npm install
npm run dev
```

## מבנה הפרויקט

- `src/App.tsx` - מעטפת האפליקציה (Header, ניווט תחתון, ניהול לשוניות)
- `src/components/LearnTab.tsx` - לשונית "למידה" עם כפתור הפעלת סוכן החירום והשיעורים
- `src/components/QuizTab.tsx` - לשונית "בוחן מהיר"
- `src/components/ChatTab.tsx` - לשונית "סוכן חירום" (צ'אט)
- `src/services/geminiService.ts` - שכבת תקשורת עם סוכן ה-AI (כרגע מדומה, מוכנה לחיבור מודל אמיתי)
- `src/data/content.ts` - תוכן השיעורים והשאלות
