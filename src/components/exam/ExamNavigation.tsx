import { ChevronRight, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasSelectedAnswer: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

export function ExamNavigation({
  currentQuestion,
  totalQuestions,
  hasSelectedAnswer,
  onNext,
  onSubmit
}: ExamNavigationProps) {
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="w-32 md:w-48 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>

        {/* Next/Submit Button */}
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={!hasSelectedAnswer}
            className={cn(
              "exam-nav-btn bg-success text-success-foreground flex items-center gap-2",
              "hover:bg-success/90 active:scale-95",
              !hasSelectedAnswer && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
            NỘP BÀI
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasSelectedAnswer}
            className={cn(
              "exam-nav-btn bg-primary text-primary-foreground flex items-center gap-2",
              "hover:bg-primary/90 active:scale-95",
              !hasSelectedAnswer && "opacity-50 cursor-not-allowed"
            )}
          >
            CÂU TIẾP THEO
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
