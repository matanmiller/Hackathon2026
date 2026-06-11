import quotesData from './famous_medical_quotes.json';

export const MEDICAL_QUOTES: string[] = quotesData.medical_wisdom_for_laypeople.categories.flatMap(
  (category) => category.sentences,
);
