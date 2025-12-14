import { Question, Answer, QuestionCategory, TipsData } from '@/types/exam';
import rawQuestionsData from '@/questions.json';
import tipsRaw from '../meo600.json';

// Cast the imported JSON to our TipsData type
export const tipsData: TipsData = tipsRaw as TipsData;

// Type definition for the raw JSON structure
interface RawQuestion {
  number: number;
  question: string;
  category: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
  explanation: string;
  hinhanhq: string | null;
  hinhanhqAlt: string | null;
}

const rawQuestions = rawQuestionsData as RawQuestion[];

function getCategoryFromRaw(rawCat: string): QuestionCategory {
  if (rawCat.includes('diem-liet')) {
    return 'critical_situation';
  }

  // Remove ' diem-liet' if it exists to clean up check (though handled above, just for safety)
  const cleanCat = rawCat.replace(' diem-liet', '').trim();

  switch (cleanCat) {
    case 'khai-niem':
      return 'rules';
    case 'van-hoa':
      return 'culture_ethics';
    case 'ky-thuat':
      return 'driving_technique';
    case 'cau-tao':
      return 'vehicle_structure';
    case 'bien-bao':
      return 'road_signs';
    case 'tinh-huong':
      return 'simulation';
    default:
      return 'rules';
  }
}

function normalizeImagePath(rawPath: string | null): string | undefined {
  if (!rawPath) return undefined;

  // Extract filename from path (handles Unix and Windows separators)
  const filename = rawPath.split(/[/\\]/).pop();
  if (!filename) return undefined;

  // Always use the specific directory requested
  return `/img/600cau2025/${filename}`;
}

function convertToAppQuestion(raw: RawQuestion): Question {
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const answers = raw.answers.map((ans, index) => ({
    label: letters[index] || String.fromCharCode(65 + index),
    text: ans.text
  }));

  const correctIndex = raw.answers.findIndex(a => a.correct);
  const correctAnswer = correctIndex !== -1 ? answers[correctIndex].label : '';

  return {
    id: raw.number,
    question: raw.question,
    answers: answers,
    correctAnswer: correctAnswer,
    isDiemLiet: raw.category.includes('diem-liet'),
    image: normalizeImagePath(raw.hinhanhq),
    explanation: raw.explanation,
    category: getCategoryFromRaw(raw.category),
    topic: getCategoryFromRaw(raw.category) // Map topic to category for compatibility
  };
}

// Transform all questions
const allQuestions = rawQuestions.map(convertToAppQuestion);

// Group by category for the application structure
export const questionBank: Record<QuestionCategory, Question[]> = {
  rules: allQuestions.filter(q => q.category === 'rules'),
  critical_situation: allQuestions.filter(q => q.category === 'critical_situation'),
  culture_ethics: allQuestions.filter(q => q.category === 'culture_ethics'),
  driving_technique: allQuestions.filter(q => q.category === 'driving_technique'),
  vehicle_structure: allQuestions.filter(q => q.category === 'vehicle_structure'),
  road_signs: allQuestions.filter(q => q.category === 'road_signs'),
  simulation: allQuestions.filter(q => q.category === 'simulation'),
};

export const mockQuestionsB2 = allQuestions;

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateExamByStructure(structure: Record<string, number>): Question[] {
  let examQuestions: Question[] = [];
  // Use typed keys for safety
  const categories = Object.keys(structure) as QuestionCategory[];

  for (const cat of categories) {
    const count = structure[cat];
    const pool = questionBank[cat] || [];
    const shuffled = shuffle(pool);
    examQuestions = [...examQuestions, ...shuffled.slice(0, count)];
  }

  return examQuestions;
}

console.log(`Loaded ${allQuestions.length} questions from JSON.`);
Object.entries(questionBank).forEach(([cat, questions]) => {
  console.log(`- ${cat}: ${questions.length} questions`);
});
