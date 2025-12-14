import { useState, useMemo } from 'react';
import { Question, TOPICS } from '@/types/exam';
import { mockQuestionsB2 } from '@/data/mockQuestions';
import { TopicSelector } from './TopicSelector';
import { PracticeQuestionCard } from './PracticeQuestionCard';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  BookOpen,
  CheckCircle2,
  XCircle,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PracticeModeProps {
  onExit: () => void;
}

export const PracticeMode = ({ onExit }: PracticeModeProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  // Filter questions by topic
  const filteredQuestions = useMemo(() => {
    if (selectedTopic === null) {
      return [...mockQuestionsB2];
    }
    if (selectedTopic === 'diem-liet') {
      return mockQuestionsB2.filter(q => q.isDiemLiet);
    }
    return mockQuestionsB2.filter(q => q.topic === selectedTopic);
  }, [selectedTopic]);

  // Calculate question counts per topic
  const topicQuestionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TOPICS.forEach(topic => {
      if (topic.id === 'diem-liet') {
        counts[topic.id] = mockQuestionsB2.filter(q => q.isDiemLiet).length;
      } else {
        counts[topic.id] = mockQuestionsB2.filter(q => q.topic === topic.id).length;
      }
    });
    return counts;
  }, []);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (showResults[currentQuestion.id]) return;

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    setShowResults(prev => ({ ...prev, [currentQuestion.id]: true }));

    // Update stats
    if (answer === currentQuestion.correctAnswer) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults({});
    setStats({ correct: 0, wrong: 0 });
  };

  const handleBackToTopics = () => {
    setIsPracticing(false);
    handleRestart();
  };

  const handleStartPractice = () => {
    if (filteredQuestions.length > 0) {
      handleRestart();
      setIsPracticing(true);
    }
  };

  // Topic Selection Screen
  if (!isPracticing) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onExit}
                className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Chế độ Luyện tập</h1>
                  <p className="text-primary-foreground/80 text-sm">Xem đáp án ngay • Học theo chủ đề</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-foreground">Chọn chủ đề luyện tập</h2>

            <TopicSelector
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
              topicQuestionCounts={topicQuestionCounts}
            />

            {/* Start Button */}
            <div className="mt-8">
              <button
                onClick={handleStartPractice}
                disabled={filteredQuestions.length === 0}
                className={cn(
                  "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300",
                  filteredQuestions.length > 0
                    ? "bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {filteredQuestions.length > 0
                  ? `BẮT ĐẦU LUYỆN TẬP (${filteredQuestions.length} câu)`
                  : "Không có câu hỏi"
                }
              </button>
            </div>

            {/* Practice Info */}
            <div className="mt-8 bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Về chế độ Luyện tập</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Xem đáp án đúng ngay sau khi chọn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Có giải thích chi tiết cho từng câu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Tự do di chuyển giữa các câu hỏi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Không giới hạn thời gian</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Practice Screen
  const isCompleted = Object.keys(showResults).length === filteredQuestions.length;
  const progressPercent = (Object.keys(showResults).length / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToTopics}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">{stats.correct}</span>
              </div>
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="w-5 h-5" />
                <span className="font-bold">{stats.wrong}</span>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="hidden sm:inline">Làm lại</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {isCompleted ? (
            // Completion Screen
            <div className="bg-card border border-border rounded-xl p-8 text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 bg-success/20 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Hoàn thành!</h2>
              <p className="text-muted-foreground mb-6">
                Bạn đã hoàn thành {filteredQuestions.length} câu hỏi
              </p>

              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{stats.correct}</div>
                  <div className="text-sm text-muted-foreground">Đúng</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{stats.wrong}</div>
                  <div className="text-sm text-muted-foreground">Sai</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round((stats.correct / filteredQuestions.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Tỷ lệ đúng</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Luyện tập lại
                </button>
                <button
                  onClick={handleBackToTopics}
                  className="px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
                >
                  Đổi chủ đề
                </button>
                <button
                  onClick={onExit}
                  className="px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Trang chủ
                </button>
              </div>
            </div>
          ) : (
            <>
              <PracticeQuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={filteredQuestions.length}
                selectedAnswer={answers[currentQuestion.id] || null}
                showResult={showResults[currentQuestion.id] || false}
                onSelectAnswer={handleSelectAnswer}
              />

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all",
                    currentQuestionIndex === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Câu trước
                </button>

                {/* Question Dots */}
                <div className="hidden md:flex items-center gap-1 overflow-x-auto max-w-[300px] px-2">
                  {filteredQuestions.slice(
                    Math.max(0, currentQuestionIndex - 3),
                    Math.min(filteredQuestions.length, currentQuestionIndex + 4)
                  ).map((q, idx) => {
                    const actualIndex = Math.max(0, currentQuestionIndex - 3) + idx;
                    const hasAnswer = showResults[q.id];
                    const isCorrect = answers[q.id] === q.correctAnswer;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(actualIndex)}
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all",
                          actualIndex === currentQuestionIndex
                            ? "bg-primary text-primary-foreground scale-110"
                            : hasAnswer
                              ? isCorrect
                                ? "bg-success/20 text-success"
                                : "bg-destructive/20 text-destructive"
                              : "bg-muted text-muted-foreground hover:bg-accent"
                        )}
                      >
                        {actualIndex + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === filteredQuestions.length - 1}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all",
                    currentQuestionIndex === filteredQuestions.length - 1
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Câu sau
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
