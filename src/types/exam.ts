export interface Answer {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
  correctAnswer: string;
  isDiemLiet: boolean;
  image?: string;
  explanation?: string;
  topic?: string;
  category?: QuestionCategory;
}

export interface Tip {
  tip: string;
  questions: string[];
  image?: string;
}

export interface TipsData {
  source: string;
  total_tips: number;
  tips: Tip[];
}

// Các nhóm kiến thức theo quy định mới
export type QuestionCategory =
  | 'rules'              // Quy định chung & quy tắc giao thông
  | 'critical_situation' // Tình huống mất ATGT nghiêm trọng (điểm liệt)
  | 'culture_ethics'     // Văn hóa giao thông, đạo đức, PCCC, cứu hộ
  | 'driving_technique'  // Kỹ thuật lái xe
  | 'vehicle_structure'  // Cấu tạo & sửa chữa
  | 'road_signs'         // Biển báo & báo hiệu đường bộ
  | 'simulation';        // Sa hình & xử lý tình huống

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: QuestionCategory;
  questionCount?: number;
}

export const TOPICS: Topic[] = [
  {
    id: 'rules',
    name: 'Quy định & Quy tắc GT',
    description: 'Các quy định chung và quy tắc giao thông đường bộ',
    icon: 'BookOpen',
    category: 'rules'
  },
  {
    id: 'critical_situation',
    name: 'Câu điểm liệt',
    description: 'Tình huống mất ATGT nghiêm trọng - Sai là trượt!',
    icon: 'AlertTriangle',
    category: 'critical_situation'
  },
  {
    id: 'culture_ethics',
    name: 'Văn hóa & Đạo đức',
    description: 'Văn hóa giao thông, đạo đức, PCCC, cứu hộ',
    icon: 'Heart',
    category: 'culture_ethics'
  },
  {
    id: 'driving_technique',
    name: 'Kỹ thuật lái xe',
    description: 'Kỹ năng và kỹ thuật lái xe an toàn',
    icon: 'Car',
    category: 'driving_technique'
  },
  {
    id: 'vehicle_structure',
    name: 'Cấu tạo & Sửa chữa',
    description: 'Hiểu biết về cấu tạo và bảo dưỡng xe',
    icon: 'Wrench',
    category: 'vehicle_structure'
  },
  {
    id: 'road_signs',
    name: 'Biển báo đường bộ',
    description: 'Nhận biết các loại biển báo và báo hiệu giao thông',
    icon: 'SignpostBig',
    category: 'road_signs'
  },
  {
    id: 'simulation',
    name: 'Sa hình & Tình huống',
    description: 'Xử lý tình huống giao thông qua hình ảnh',
    icon: 'Image',
    category: 'simulation'
  },
];

// Cấu trúc phân bổ câu hỏi theo từng hạng
export interface ExamStructure {
  rules: number;
  critical_situation: number;
  culture_ethics: number;
  driving_technique: number;
  vehicle_structure: number;
  road_signs: number;
  simulation: number;
}

export interface ExamConfig {
  category: string;
  categoryName: string;
  totalQuestions: number;
  diemLietCount: number;
  timeMinutes: number;
  passingScore: number;
  structure: ExamStructure;
}

export interface ExamResult {
  correct: number;
  wrong: number;
  diemLietWrong: number;
  passed: boolean;
  timeUsed: number;
  answers: Record<number, string | null>;
  wrongQuestions: Question[];
}

export interface ExamState {
  currentQuestion: number;
  answers: Record<number, string | null>;
  startTime: Date;
  tabLeaveCount: number;
  isSubmitted: boolean;
}

// Cấu hình đề thi theo từng hạng (theo quy định mới)
export const EXAM_CONFIGS: Record<string, ExamConfig> = {
  // Hạng B (B1 & B2) - 30 câu
  B1: {
    category: 'B1',
    categoryName: 'Hạng B1 - Xe ô tô số tự động',
    totalQuestions: 30,
    diemLietCount: 1,
    timeMinutes: 20,
    passingScore: 27,
    structure: {
      rules: 8,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 1,
      vehicle_structure: 1,
      road_signs: 9,
      simulation: 9
    }
  },
  B2: {
    category: 'B2',
    categoryName: 'Hạng B2 - Xe ô tô dưới 9 chỗ',
    totalQuestions: 30,
    diemLietCount: 1,
    timeMinutes: 20,
    passingScore: 27,
    structure: {
      rules: 8,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 1,
      vehicle_structure: 1,
      road_signs: 9,
      simulation: 9
    }
  },
  // Hạng C1 - 35 câu
  C1: {
    category: 'C1',
    categoryName: 'Hạng C1 - Xe tải đến 7.5 tấn',
    totalQuestions: 35,
    diemLietCount: 1,
    timeMinutes: 22,
    passingScore: 32,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 10,
      simulation: 10
    }
  },
  // Hạng C - 40 câu
  C: {
    category: 'C',
    categoryName: 'Hạng C - Xe tải trên 7.5 tấn',
    totalQuestions: 40,
    diemLietCount: 1,
    timeMinutes: 24,
    passingScore: 36,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 14,
      simulation: 11
    }
  },
  // Hạng D1 - 45 câu
  D1: {
    category: 'D1',
    categoryName: 'Hạng D1 - Xe khách 9-16 chỗ',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng D2 - 45 câu
  D2: {
    category: 'D2',
    categoryName: 'Hạng D2 - Xe khách 17-30 chỗ',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng D - 45 câu
  D: {
    category: 'D',
    categoryName: 'Hạng D - Xe khách trên 30 chỗ',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng BE - 45 câu
  BE: {
    category: 'BE',
    categoryName: 'Hạng BE - Xe ô tô kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng C1E - 45 câu
  C1E: {
    category: 'C1E',
    categoryName: 'Hạng C1E - Xe C1 kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng CE - 45 câu
  CE: {
    category: 'CE',
    categoryName: 'Hạng CE - Xe tải kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng D1E - 45 câu
  D1E: {
    category: 'D1E',
    categoryName: 'Hạng D1E - Xe D1 kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng D2E - 45 câu
  D2E: {
    category: 'D2E',
    categoryName: 'Hạng D2E - Xe D2 kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  },
  // Hạng DE - 45 câu
  DE: {
    category: 'DE',
    categoryName: 'Hạng DE - Xe khách kéo rơ moóc',
    totalQuestions: 45,
    diemLietCount: 1,
    timeMinutes: 26,
    passingScore: 41,
    structure: {
      rules: 10,
      critical_situation: 1,
      culture_ethics: 1,
      driving_technique: 2,
      vehicle_structure: 1,
      road_signs: 16,
      simulation: 14
    }
  }
};

// Helper: Lấy tổng số câu từ cấu trúc
export function getTotalFromStructure(structure: ExamStructure): number {
  return Object.values(structure).reduce((sum, count) => sum + count, 0);
}
