# Chế Độ Thi Thật - GPLX

Hệ thống thi thử giấy phép lái xe theo chuẩn Bộ Công an với giao diện giống 95% phần mềm thi thật tại Trung tâm sát hạch.

## Tính năng

### 🎯 Giao diện thi thật
- Màn hình bắt đầu với thông tin hạng thi
- Header hiển thị mã học viên, hạng thi, đồng hồ đếm ngược
- Khung câu hỏi lớn, nút đáp án kiểu block
- Điều hướng một chiều (không quay lại câu trước)
- Fullscreen khi thi

### ⏱️ Đồng hồ đếm ngược
- Hiển thị thời gian còn lại
- Đổi màu khi ≤5 phút (vàng)
- Nhấp nháy đỏ khi ≤1 phút
- Tự động nộp bài khi hết giờ

### 🔒 Anti-cheat
- Cảnh báo khi rời tab
- Chặn F5/refresh
- Log hành vi rời màn hình
- Popup xác nhận khi cố thoát

### 📊 Kết quả chi tiết
- Thống kê ĐẠT/KHÔNG ĐẠT
- Số câu đúng/sai
- Câu điểm liệt sai
- Xem lại câu sai với giải thích

## Cấu hình hạng thi

| Hạng | Số câu | Thời gian | Điểm liệt | Đạt tối thiểu |
|------|--------|-----------|-----------|---------------|
| A1   | 25     | 19 phút   | 1         | 21            |
| A2   | 25     | 19 phút   | 1         | 23            |
| B1   | 30     | 20 phút   | 1         | 27            |
| B2   | 35     | 22 phút   | 1         | 32            |
| C    | 40     | 24 phút   | 1         | 36            |
| D    | 45     | 26 phút   | 2         | 41            |
| E    | 45     | 26 phút   | 2         | 41            |
| F    | 45     | 26 phút   | 2         | 41            |

## Cách sử dụng

### Import component

\`\`\`tsx
import { RealExamMode } from '@/components/exam';

function App() {
  return (
    <RealExamMode 
      category="B2"  // Hạng thi: A1, A2, B1, B2, C, D, E, F
      onExit={() => console.log('Exit exam')}
    />
  );
}
\`\`\`

### Tùy chỉnh cấu hình

Chỉnh sửa file `src/types/exam.ts` để thay đổi:
- Số câu hỏi
- Thời gian thi
- Số câu điểm liệt
- Điểm đạt tối thiểu

\`\`\`typescript
export const EXAM_CONFIGS: Record<string, ExamConfig> = {
  B2: {
    category: 'B2',
    categoryName: 'Hạng B2 - Xe ô tô dưới 9 chỗ',
    totalQuestions: 35,
    diemLietCount: 1,
    timeMinutes: 22,
    passingScore: 32
  },
  // ... thêm hạng khác
};
\`\`\`

### Thêm câu hỏi mới

Chỉnh sửa file `src/data/mockQuestions.ts`:

\`\`\`typescript
const newQuestion: Question = {
  id: 1,
  question: "Nội dung câu hỏi?",
  answers: [
    { label: "A", text: "Đáp án A" },
    { label: "B", text: "Đáp án B" },
    { label: "C", text: "Đáp án C" }
  ],
  correctAnswer: "B",
  isDiemLiet: false,  // true nếu là câu điểm liệt
  image: "/path/to/image.jpg",  // optional
  explanation: "Giải thích đáp án"  // optional
};
\`\`\`

## Cấu trúc thư mục

\`\`\`
src/
├── components/
│   └── exam/
│       ├── index.ts              # Export tất cả components
│       ├── RealExamMode.tsx      # Component chính
│       ├── ExamStartScreen.tsx   # Màn hình bắt đầu
│       ├── ExamHeader.tsx        # Header với timer
│       ├── ExamQuestionCard.tsx  # Card câu hỏi
│       ├── ExamNavigation.tsx    # Thanh điều hướng
│       ├── ExamResultScreen.tsx  # Màn hình kết quả
│       └── TabLeaveWarning.tsx   # Popup cảnh báo rời tab
├── data/
│   └── mockQuestions.ts          # Dữ liệu câu hỏi mẫu
├── hooks/
│   ├── useExamTimer.ts           # Hook đếm ngược
│   ├── useAntiCheat.ts           # Hook chống gian lận
│   └── useFullscreen.ts          # Hook fullscreen API
└── types/
    └── exam.ts                   # TypeScript types & configs
\`\`\`

## API Endpoints (Mock)

### GET /api/exam/real
Tạo đề thi ngẫu nhiên theo hạng.

### POST /api/exam/real/submit
Nộp bài và nhận kết quả.

### GET /api/exam/real/config
Lấy cấu hình tất cả các hạng.

## Công nghệ

- React + TypeScript
- Tailwind CSS
- Lucide Icons
- Fullscreen API
- Page Visibility API

## Ghi chú

- Dữ liệu câu hỏi hiện tại là mock data để demo
- Trong production, cần kết nối với backend thực
- Có thể tích hợp với Supabase để lưu kết quả thi
