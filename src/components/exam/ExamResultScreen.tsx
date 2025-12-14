import { ExamResult, ExamConfig, Question } from '@/types/exam';
import { CheckCircle, XCircle, AlertTriangle, RotateCcw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ExamResultScreenProps {
  result: ExamResult;
  config: ExamConfig;
  questions: Question[];
  onRetry: () => void;
  onHome: () => void;
}

export function ExamResultScreen({ 
  result, 
  config, 
  questions,
  onRetry, 
  onHome 
}: ExamResultScreenProps) {
  const [showExplanations, setShowExplanations] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const passPercentage = Math.round((result.correct / config.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Result Header */}
        <div className={cn(
          "rounded-xl p-8 text-center mb-8 animate-scale-in",
          result.passed ? "bg-success" : "bg-destructive"
        )}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {result.passed ? (
              <CheckCircle className="w-16 h-16 text-success-foreground" />
            ) : (
              <XCircle className="w-16 h-16 text-destructive-foreground" />
            )}
          </div>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-2",
            result.passed ? "text-success-foreground" : "text-destructive-foreground"
          )}>
            {result.passed ? "ĐẠT" : "KHÔNG ĐẠT"}
          </h1>
          <p className={cn(
            "text-lg opacity-90",
            result.passed ? "text-success-foreground" : "text-destructive-foreground"
          )}>
            Bài thi sát hạch lý thuyết - Hạng {config.category}
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-6 text-center text-foreground">THỐNG KÊ KẾT QUẢ</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-success">{result.correct}</p>
              <p className="text-sm text-muted-foreground">Câu đúng</p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-destructive">{result.wrong}</p>
              <p className="text-sm text-muted-foreground">Câu sai</p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{passPercentage}%</p>
              <p className="text-sm text-muted-foreground">Tỷ lệ đúng</p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{Math.round(result.timeUsed * 10) / 10}</p>
              <p className="text-sm text-muted-foreground">Phút hoàn thành</p>
            </div>
          </div>

          {/* Điểm liệt info */}
          {result.diemLietWrong > 0 && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">Sai câu điểm liệt</p>
                <p className="text-sm text-foreground">
                  Bạn đã trả lời sai {result.diemLietWrong} câu điểm liệt. 
                  Theo quy định, sai câu điểm liệt sẽ KHÔNG ĐẠT bất kể số câu đúng.
                </p>
              </div>
            </div>
          )}

          {/* Score requirement */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Yêu cầu đạt: {config.passingScore}/{config.totalQuestions} câu và không sai câu điểm liệt
          </div>
        </div>

        {/* Wrong Questions */}
        {result.wrongQuestions.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-lg animate-fade-in">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="w-full flex items-center justify-between text-xl font-bold mb-4 text-foreground"
            >
              <span>CÂU HỎI TRẢ LỜI SAI ({result.wrongQuestions.length})</span>
              {showExplanations ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>

            {showExplanations && (
              <div className="space-y-4">
                {result.wrongQuestions.map((question, index) => (
                  <div 
                    key={question.id}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedQuestion(
                        expandedQuestion === question.id ? null : question.id
                      )}
                      className="w-full p-4 text-left bg-muted hover:bg-muted/80 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Câu {index + 1}
                          </span>
                          {question.isDiemLiet && (
                            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                              ĐIỂM LIỆT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">
                          {question.question}
                        </p>
                      </div>
                      {expandedQuestion === question.id ? (
                        <ChevronUp className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    {expandedQuestion === question.id && (
                      <div className="p-4 border-t border-border bg-card">
                        <p className="font-medium mb-4">{question.question}</p>
                        
                        <div className="space-y-2 mb-4">
                          {question.answers.map(answer => (
                            <div 
                              key={answer.label}
                              className={cn(
                                "p-3 rounded-lg text-sm",
                                answer.label === question.correctAnswer 
                                  ? "bg-success/20 border border-success" 
                                  : answer.label === result.answers[question.id]
                                    ? "bg-destructive/20 border border-destructive"
                                    : "bg-muted"
                              )}
                            >
                              <span className="font-semibold">{answer.label}.</span> {answer.text}
                              {answer.label === question.correctAnswer && (
                                <span className="ml-2 text-success font-semibold">(Đáp án đúng)</span>
                              )}
                              {answer.label === result.answers[question.id] && answer.label !== question.correctAnswer && (
                                <span className="ml-2 text-destructive font-semibold">(Bạn chọn)</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {question.explanation && (
                          <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
                            <p className="text-sm font-semibold text-accent mb-1">Giải thích:</p>
                            <p className="text-sm text-foreground">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <button
            onClick={onRetry}
            className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-xl font-bold text-lg
                       hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            THI LẠI
          </button>
          <button
            onClick={onHome}
            className="flex-1 bg-secondary text-secondary-foreground py-4 px-6 rounded-xl font-bold text-lg
                       border-2 border-border hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            QUAY VỀ TRANG CHỦ
          </button>
        </div>
      </div>
    </div>
  );
}
