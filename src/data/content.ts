import type { Category, Lesson, LessonPage, QuizQuestion, ScenarioPage } from '../types';
import chokingPage1 from '../assets/lessons/choking/page1-choking-person.jpeg';
import chokingPage2Partial from '../assets/lessons/choking/page2-partial-blockage.png';
import chokingPage2Full from '../assets/lessons/choking/page2-full-blockage.png';
import chokingPage3Check from '../assets/lessons/choking/page3-check-response.jpeg';
import chokingPage3Cough from '../assets/lessons/choking/page3-encourage-cough.png';
import chokingPage4 from '../assets/lessons/choking/page4-call-for-help.png';
import chokingPage5 from '../assets/lessons/choking/page5-heimlich-maneuver.png';
import chokingPage6 from '../assets/lessons/choking/page6-loss-of-consciousness.png';
import bleedingPage1 from '../assets/lessons/bleeding/page1-massive-bleeding.png';
import bleedingPage2 from '../assets/lessons/bleeding/page2-direct-pressure.jpeg';
import bleedingPage3 from '../assets/lessons/bleeding/page3-tourniquet.jpeg';
import bleedingPage4 from '../assets/lessons/bleeding/page4-record-time.png';
import bleedingPage5 from '../assets/lessons/bleeding/page5-wound-packing.png';
import bleedingScenario1 from '../assets/lessons/bleeding/scenario/01-bleeding-leg.png';
import bleedingScenario2 from '../assets/lessons/bleeding/scenario/02-pressing-with-knee.png';
import bleedingScenario3 from '../assets/lessons/bleeding/scenario/03-bleeding-leg-with-tourniquet.png';

const CHOKING_PAGES: LessonPage[] = [
  {
    header: 'הסבר על הבעיה',
    items: [
      {
        text: 'חנק מתרחש כאשר גוף זר (מזון, צעצוע, חפץ) חוסם את קנה הנשימה ומונע מעבר חמצן לריאות. זהו מצב חירום קיצוני: ללא חמצן, איבוד הכרה יתרחש תוך דקות ספורות, ונזק מוחי בלתי הפיך יחל תוך 4-6 דקות.',
        image: chokingPage1,
      },
    ],
  },
  {
    header: 'יש להבחין בין שני מצבים',
    items: [
      {
        label: 'חסימה חלקית',
        text: 'האדם מסוגל להשתעל, להשמיע קול או לדבר.',
        image: chokingPage2Partial,
      },
      {
        label: 'חסימה מלאה',
        text: 'האדם אינו מסוגל לדבר, לנשום או להשתעל, ולעיתים קרובות יחזיק את גרונו בשתי ידיו (הסימן האוניברסלי לחנק).',
        image: chokingPage2Full,
      },
    ],
  },
  {
    header: 'אופן הטיפול',
    items: [
      {
        text: 'בדקו אם האדם מסוגל להשתעל או לדבר.',
        image: chokingPage3Check,
      },
      {
        text: 'אם כן — עודדו אותו להמשיך להשתעל ואל תטפחו על גבו (הדבר עלול להפיל את החפץ התקוע עמוק יותר).',
        image: chokingPage3Cough,
      },
    ],
  },
  {
    header: 'הזעקת עזרה',
    items: [
      {
        text: 'אם האדם לא נושם ולא משתעל, התקשרו מיד למד"א (101) או הפעילו לחצן מצוקה (אם ברשותכם), והעבירו את הטלפון לרמקול.',
        image: chokingPage4,
      },
    ],
  },
  {
    header: 'ביצוע תמרון היימליך (למבוגרים)',
    items: [
      {
        text: 'עמדו מאחורי הנחנק, חבקו את מותניו, הצמידו אגרוף אחד למרכז הבטן (מעל הטבור ומתחת לעצם החזה), כסו אותו ביד השנייה, ובצעו לחיצות חזקות פנימה וכלפי מעלה.',
        image: chokingPage5,
      },
      {
        text: 'יש לבצע פעולה זו עד יציאת הגוף הזר.',
      },
    ],
  },
  {
    header: 'במקרה של איבוד הכרה',
    items: [
      {
        text: 'אם הנחנק מאבד הכרה, השכיבו אותו בעדינות על הרצפה והתחילו מיד בפעולות החייאה (עיסויי חזה). ראו שיעור החייאה.',
        image: chokingPage6,
      },
      {
        text: 'בכל פעם שפותחים נתיב אוויר, חפשו את הגוף הזר בפה — אם הוא נראה לעין, שלפו אותו.',
      },
    ],
  },
];

const BLEEDING_PAGES: LessonPage[] = [
  {
    header: 'הסבר על הבעיה',
    items: [
      {
        text: 'דימום פורץ הוא מצב שבו דם יוצא מכלי דם גדול (בדרך כלל עורק) בקצב מהיר (בצורה של שפריץ או זרימה חזקה ומתמשכת).',
        image: bleedingPage1,
      },
      {
        text: 'אדם יכול לדמם למוות מפגיעה בעורק ראשי תוך פחות מ-3 דקות.',
      },
      {
        text: 'לכן, עצירת הדימום קודמת לכל טיפול אחר, כולל טיפול בנתיב אוויר.',
      },
    ],
  },
  {
    header: 'אופן הטיפול',
    items: [
      {
        text: 'ראשית, וודאו שהסביבה בטוחה לטיפול.',
        image: bleedingPage2,
      },
      {
        text: 'הפעילו לחץ ישיר וחזק באמצעות שתי הידיים (עדיף עם גזה או בד נקי) ישירות על מקור הדימום. אל תרפו עד הנחיית גורם רפואי.',
      },
    ],
  },
  {
    header: 'הנחת חסם עורקים',
    items: [
      {
        text: 'אם מדובר בדימום פורץ בגפה, והלחץ הישיר לא עוזר (או שיש פצועים מרובים), הניחו חסם עורקים (למשל חסם CAT או סיליקון) כ-5 ס"מ מעל מקור הדימום (ולא על מפרק).',
        image: bleedingPage3,
      },
      {
        text: 'הדקו אותו עד שהדימום נעצר לחלוטין ונעלם הדופק הפריפריאלי.',
      },
    ],
  },
  {
    header: 'רישום זמן קריטי',
    items: [
      {
        text: 'שלב זה הינו חובה.',
        image: bleedingPage4,
      },
      {
        text: 'מיד לאחר קשירת חסם העורקים, כתבו את השעה המדויקת של ההנחה על מצחו של הפצוע או על החסם עצמו.',
      },
      {
        text: 'מידע זה קריטי עבור המנתחים בבית החולים.',
      },
    ],
  },
  {
    header: 'טיפול בדימום באזורי חיבור',
    items: [
      {
        text: 'באזורים אלו (מפשעה, בית שחי, צוואר) לא ניתן להניח חסם עורקים.',
        image: bleedingPage5,
      },
      {
        text: 'דחסו תחבושת מתאימה ולחצו לחיצה מתמשכת וחזקה עם שתי הידיים במשך 3 דקות לפחות (אם משתמשים בתחבושת המוסטטית עוצרת דימום) או 10 דקות (בתחבושת רגילה).',
      },
    ],
  },
];

const BLEEDING_SCENARIO: ScenarioPage[] = [
  {
    image: bleedingScenario1,
    options: [
      { id: 'wash', text: 'לחפש מים כדי לשטוף את הפצע' },
      { id: 'knee-pressure', text: 'ללחוץ בעוצמה עם הברך ישירות על מקור הדימום', correct: true },
      { id: 'wait-side', text: 'להניח את הפצוע על הצד ולהמתין לעזרה' },
    ],
  },
  {
    image: bleedingScenario2,
    options: [
      { id: 'release', text: 'להסיר את הלחץ ולבדוק אם הדימום נעצר' },
      { id: 'walk-alone', text: 'לתת לפצוע לקום וללכת לבד לקבל עזרה' },
      { id: 'call-ambulance', text: 'להזעיק מיד אמבולנס (101)', correct: true },
    ],
  },
  {
    image: bleedingScenario3,
    options: [
      { id: 'loose-bandage', text: 'לקשור תחבושת רפויה סביב הפצע' },
      { id: 'wait-stop', text: 'להמתין שהדימום ייעצר מעצמו' },
      { id: 'tourniquet', text: 'לאלתר חסם עורקים מחגורה ומקל ולהדק מעל הפצע', correct: true },
    ],
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'medical',
    title: 'חירום רפואי',
    description: 'זיהוי וטיפול ראשוני במצבי חירום רפואיים כגון חנק ודימומים',
    accent: 'red',
  },
  {
    id: 'nature',
    title: 'אסונות טבע',
    description: 'התנהגות נכונה בעת רעידות אדמה, שיטפונות ושריפות',
    accent: 'sky',
  },
  {
    id: 'accidents',
    title: 'תאונות',
    description: 'התמודדות ראשונית עם תאונות דרכים ותאונות עבודה',
    accent: 'amber',
  },
  {
    id: 'war',
    title: 'חירום מלחמה',
    description: 'התנהלות נכונה בעת אזעקות, ירי ופעולות איבה',
    accent: 'violet',
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'choking',
    category: 'medical',
    title: 'חנק (תמרון היימליך)',
    subtitle: 'זיהוי וטיפול בחסימת דרכי נשימה',
    icon: 'choking',
    pages: CHOKING_PAGES,
    steps: [
      {
        id: 'choking-1',
        title: 'שלב 1: זיהוי סימני חנק',
        description:
          'בדקו האם הנפגע אוחז בגרונו, אינו מצליח לדבר, לנשום או להשתעל, והעור שלו מתחיל להכחיל. אלו סימנים לחסימה מלאה של דרכי הנשימה המחייבים פעולה מיידית.',
      },
      {
        id: 'choking-2',
        title: 'שלב 2: עידוד שיעול',
        description:
          'אם הנפגע עדיין מצליח לשעול או להוציא קול - עודדו אותו להמשיך לשעול בכוח. אל תכו על גבו ואל תתערבו בשלב זה, מאחר שהשיעול הוא הדרך היעילה ביותר לפינוי הגוף הזר.',
      },
      {
        id: 'choking-3',
        title: 'שלב 3: ביצוע לחיצות בטן (היימליך)',
        description:
          'אם הנפגע אינו מסוגל לשעול, לנשום או לדבר - עמדו מאחוריו, הניחו אגרוף מעל לטבור, אחזו אותו ביד השנייה ובצעו לחיצות חדות פנימה ולמעלה, עד לפליטת הגוף הזר או עד הגעת סיוע רפואי.',
      },
    ],
  },
  {
    id: 'bleeding',
    category: 'medical',
    title: 'דימום מאסיבי',
    subtitle: 'עצירת דימום חיצוני בגפיים',
    icon: 'bleeding',
    pages: BLEEDING_PAGES,
    scenario: BLEEDING_SCENARIO,
    steps: [
      {
        id: 'bleeding-1',
        title: 'שלב 1: הפעלת לחץ ישיר על הפצע',
        description:
          'הניחו גזה או בד נקי ישירות על מקור הדימום ולחצו בחוזקה ובאופן רציף. אל תסירו את הבד גם אם הוא ספוג בדם - הוסיפו שכבות נוספות מעליו והמשיכו ללחוץ.',
      },
      {
        id: 'bleeding-2',
        title: 'שלב 2: הרמת האיבר',
        description:
          'אם ניתן וללא חשד לשבר, הרימו את הגפה הפצועה מעל לגובה הלב. פעולה זו מסייעת להאט את זרימת הדם אל אזור הפציעה ותומכת בעצירת הדימום לצד הלחץ הישיר.',
      },
      {
        id: 'bleeding-3',
        title: 'שלב 3: הנחת חסם עורקים במידת הצורך',
        description:
          'אם הדימום אינו נעצר למרות הלחץ הישיר וקיימת סכנת חיים, הניחו חסם עורקים מעל לפצע, קרוב לגוף ככל האפשר, הדקו עד לעצירת הדימום ותעדו בכתב את שעת ההנחה.',
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-choking',
    lessonId: 'choking',
    question: 'מהו הצעד הראשון המומלץ כאשר אדם בהכרה אך נחנק ולא מצליח לדבר?',
    options: [
      { id: 'water', text: 'לתת מים' },
      { id: 'cough', text: 'לעודד להשתעל' },
      { id: 'cpr', text: 'להתחיל החייאה' },
    ],
    correctOptionId: 'cough',
    explanationCorrect:
      'נכון מאוד! עידוד לשיעול הוא הצעד הראשון - הוא נותן לגוף הזדמנות לפנות את החסימה בעצמו לפני מעבר להתערבות פעילה.',
    explanationIncorrect:
      'לא מדויק. כאשר אדם בהכרה ונחנק, יש לעודד אותו להשתעל בכוח - זוהי הדרך הטבעית והבטוחה ביותר לפינוי החסימה בשלב זה.',
  },
  {
    id: 'q-bleeding',
    lessonId: 'bleeding',
    question: 'כיצד יש לפעול תחילה במקרה של דימום מאסיבי בגפה?',
    options: [
      { id: 'hot-water', text: 'לשטוף במים חמים' },
      { id: 'direct-pressure', text: 'להפעיל לחץ ישיר על הפצע' },
      { id: 'ointment', text: 'למרוח משחה' },
    ],
    correctOptionId: 'direct-pressure',
    explanationCorrect:
      'נכון! לחץ ישיר וממושך על הפצע הוא הפעולה הראשונה והחשובה ביותר לעצירת דימום מאסיבי, עוד לפני שקולים על הרמת האיבר או חסם עורקים.',
    explanationIncorrect:
      'לא מדויק. הפעולה הראשונה והקריטית ביותר היא הפעלת לחץ ישיר וממושך על מקור הדימום באמצעות גזה או בד נקי.',
  },
];
