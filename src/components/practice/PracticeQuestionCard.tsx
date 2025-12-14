import { Question } from '@/types/exam';
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PracticeQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  showResult: boolean;
  onSelectAnswer: (answer: string) => void;
}

export const PracticeQuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: PracticeQuestionCardProps) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
      {/* Question Header */}
      <div className="bg-primary/10 px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg font-bold text-sm">
              Câu {questionNumber}/{totalQuestions}
            </span>
            {question.isDiemLiet && (
              <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                ĐIỂM LIỆT
              </span>
            )}
          </div>
          {showResult && (
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-lg font-semibold text-sm",
              isCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            )}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Đúng
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Sai
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6 leading-relaxed">
          {question.question}
        </h3>

        {question.image && (
          <div className="mb-6 flex justify-center">
            <img
              src={question.image}
              alt="Hình ảnh câu hỏi"
              className="max-w-full max-h-64 rounded-lg border border-border"
            />
          </div>
        )}

        {/* Answers */}
        <div className="space-y-3">
          {question.answers.map((answer) => {
            const isSelected = selectedAnswer === answer.label;
            const isCorrectAnswer = answer.label === question.correctAnswer;
            
            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-start gap-4";
            
            if (showResult) {
              if (isCorrectAnswer) {
                buttonClass += " border-success bg-success/10 text-success";
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += " border-destructive bg-destructive/10 text-destructive";
              } else {
                buttonClass += " border-border bg-muted/50 text-muted-foreground";
              }
            } else if (isSelected) {
              buttonClass += " border-primary bg-primary/10";
            } else {
              buttonClass += " border-border bg-card hover:border-primary/50 hover:bg-accent/50";
            }

            return (
              <button
                key={answer.label}
                onClick={() => !showResult && onSelectAnswer(answer.label)}
                disabled={showResult}
                className={buttonClass}
              >
                <span className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg",
                  showResult && isCorrectAnswer ? "bg-success text-success-foreground" :
                  showResult && isSelected && !isCorrectAnswer ? "bg-destructive text-destructive-foreground" :
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {answer.label}
                </span>
                <span className={cn(
                  "flex-1 pt-2 text-base",
                  showResult && isCorrectAnswer ? "font-semibold" : ""
                )}>
                  {answer.text}
                </span>
                {showResult && isCorrectAnswer && (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-2" />
                )}
                {showResult && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && question.explanation && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary mb-1">Giải thích</h4>
                <p className="text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
