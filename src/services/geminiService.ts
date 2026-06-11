/**
 * Mock emergency-agent response, used until a live model API is connected.
 * Replace the body of `sendMessageToAgent` with a real API call - the
 * function signature is the only contract the UI depends on.
 */
const MOCK_AGENT_RESPONSE = `תודה על העדכון. להלן פעולות זמניות מומלצות עד הגעת צוות החירום:

• שמרו על קור רוח ואל תזיזו את הנפגע, אלא אם קיימת סכנה מיידית
• ודאו שדרכי הנשימה פנויות ונקיות מכל חפץ זר
• אם קיים דימום - הפעילו לחץ ישיר וממושך על מקור הדימום
• עקבו ברציפות אחר מצב ההכרה והנשימה של הנפגע
• ודאו שהוזמן צוות חירום (101) ועדכנו אותו בכל פרט חדש

המשיכו לתאר לי כל שינוי במצב ואכוון אתכם בהתאם לצעד הבא.`;

const RESPONSE_DELAY_MS = 1000;

/**
 * Sends a free-text emergency description to the AI agent and resolves with
 * its Hebrew, structured guidance. Currently mocked with a fixed delay and
 * canned response.
 */
export async function sendMessageToAgent(message: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

  if (!message.trim()) {
    return 'לא קיבלתי תיאור של המצב. אנא תארו בקצרה מה קורה כעת כדי שאוכל לסייע.';
  }

  return MOCK_AGENT_RESPONSE;
}
