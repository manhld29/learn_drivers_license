import { Question } from '@/types/exam';
import { cn } from '@/lib/utils';

interface ExamQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export function ExamQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer
}: ExamQuestionCardProps) {
  return (
    <div className="exam-question-card animate-fade-in">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-lg">
          Câu {questionNumber}/{totalQuestions}
        </span>
        {question.isDiemLiet && (
          <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            ĐIỂM LIỆT
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Question Image */}
      {question.image && (
        <div className="mb-6 rounded-lg overflow-hidden border border-border">
          <img 
            src={question.image} 
            alt="Hình ảnh câu hỏi" 
            className="w-full max-h-64 object-contain bg-muted"
          />
        </div>
      )}

      {/* Answer Options */}
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <button
            key={answer.label}
            onClick={() => onSelectAnswer(answer.label)}
            className={cn(
              "exam-answer-btn flex items-start gap-4",
              selectedAnswer === answer.label && "selected"
            )}
          >
            <span className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-colors",
              selectedAnswer === answer.label 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-secondary text-secondary-foreground border-border"
            )}>
              {answer.label}
            </span>
            <span className="flex-1 text-left text-base md:text-lg pt-1.5">
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
