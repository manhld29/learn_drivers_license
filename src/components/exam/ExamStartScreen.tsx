import { ExamConfig, EXAM_CONFIGS } from '@/types/exam';
import { Clock, FileText, AlertTriangle, ChevronRight } from 'lucide-react';

interface ExamStartScreenProps {
  config: ExamConfig;
  studentId: string;
  onStart: () => void;
}

export function ExamStartScreen({ config, studentId, onStart }: ExamStartScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="bg-exam-header text-exam-header-foreground rounded-t-xl p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            BÀI THI SÁT HẠCH LÝ THUYẾT
          </h1>
          <p className="text-lg opacity-90">
            GIẤY PHÉP LÁI XE
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border-2 border-t-0 border-exam-question-border rounded-b-xl p-6 md:p-8 shadow-xl">
          {/* License Category */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg text-xl font-bold mb-3">
              {config.category}
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {config.categoryName}
            </h2>
          </div>

          {/* Student ID */}
          <div className="bg-muted rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Mã học viên</p>
            <p className="text-xl font-mono font-bold text-primary">{studentId}</p>
          </div>

          {/* Exam Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">Thời gian</p>
              <p className="text-2xl font-bold text-foreground">{config.timeMinutes} phút</p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">Số câu hỏi</p>
              <p className="text-2xl font-bold text-foreground">{config.totalQuestions} câu</p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <p className="text-sm text-muted-foreground mb-1">Câu điểm liệt</p>
              <p className="text-2xl font-bold text-destructive">{config.diemLietCount} câu</p>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-8">
            <h3 className="font-bold text-warning mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              LƯU Ý QUAN TRỌNG
            </h3>
            <ul className="text-sm text-foreground space-y-2">
              <li>• Không được xem lại câu hỏi đã trả lời</li>
              <li>• Sai câu điểm liệt sẽ KHÔNG ĐẠT</li>
              <li>• Đạt tối thiểu {config.passingScore}/{config.totalQuestions} câu để ĐẠT</li>
              <li>• Bài thi sẽ tự động nộp khi hết thời gian</li>
              <li>• Không rời khỏi màn hình thi trong quá trình làm bài</li>
            </ul>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className="w-full bg-success hover:bg-success/90 text-success-foreground 
                       py-5 px-8 rounded-xl text-xl font-bold
                       transition-all duration-300 transform hover:scale-[1.02]
                       shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            BẮT ĐẦU THI THẬT
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
