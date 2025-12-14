import { useState, useCallback } from 'react';
import { Question, ExamResult, EXAM_CONFIGS } from '@/types/exam';
import { generateExamByStructure } from '@/data/mockQuestions';
import { useExamTimer } from '@/hooks/useExamTimer';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { useFullscreen } from '@/hooks/useFullscreen';
import { ExamStartScreen } from './ExamStartScreen';
import { ExamHeader } from './ExamHeader';
import { ExamQuestionCard } from './ExamQuestionCard';
import { ExamNavigation } from './ExamNavigation';
import { ExamResultScreen } from './ExamResultScreen';
import { TabLeaveWarning } from './TabLeaveWarning';

type ExamPhase = 'start' | 'exam' | 'result';

interface RealExamModeProps {
  category?: string;
  onExit?: () => void;
}

export function RealExamMode({ category = 'B2', onExit }: RealExamModeProps) {
  const config = EXAM_CONFIGS[category] || EXAM_CONFIGS.B2;
  
  // Generate student ID
  const [studentId] = useState(() => {
    const now = new Date();
    return `HV${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
  });

  // Exam state
  const [phase, setPhase] = useState<ExamPhase>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);

  // Fullscreen
  const { enterFullscreen, exitFullscreen } = useFullscreen();

  // Anti-cheat
  const { tabLeaveCount, showWarning, dismissWarning } = useAntiCheat({
    isActive: phase === 'exam',
    onTabLeave: (count) => {
      console.log(`Tab leave detected: ${count} times`);
    }
  });

  // Calculate result
  const calculateResult = useCallback(() => {
    const endTime = new Date();
    const timeUsed = startTime ? (endTime.getTime() - startTime.getTime()) / 60000 : 0;

    let correct = 0;
    let wrong = 0;
    let diemLietWrong = 0;
    const wrongQuestions: Question[] = [];

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
        wrongQuestions.push(question);
        if (question.isDiemLiet) {
          diemLietWrong++;
        }
      }
    });

    const passed = correct >= config.passingScore && diemLietWrong === 0;

    const examResult: ExamResult = {
      correct,
      wrong,
      diemLietWrong,
      passed,
      timeUsed,
      answers,
      wrongQuestions
    };

    setResult(examResult);
    setPhase('result');
    exitFullscreen();
  }, [questions, answers, startTime, config.passingScore, exitFullscreen]);

  // Timer
  const { formattedTime, isWarning, isCritical } = useExamTimer({
    totalMinutes: config.timeMinutes,
    isActive: phase === 'exam',
    onTimeUp: calculateResult
  });

  // Start exam
  const handleStartExam = useCallback(() => {
    const generatedQuestions = generateExamByStructure(config.structure);
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStartTime(new Date());
    setPhase('exam');
    enterFullscreen();
  }, [config.structure, enterFullscreen]);

  // Select answer
  const handleSelectAnswer = useCallback((answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
    }
  }, [questions, currentQuestionIndex]);

  // Next question
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Submit exam
  const handleSubmit = useCallback(() => {
    calculateResult();
  }, [calculateResult]);

  // Retry
  const handleRetry = useCallback(() => {
    setResult(null);
    setPhase('start');
  }, []);

  // Go home
  const handleHome = useCallback(() => {
    if (onExit) {
      onExit();
    } else {
      setPhase('start');
    }
  }, [onExit]);

  // Current question data
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  // Render based on phase
  if (phase === 'start') {
    return (
      <ExamStartScreen
        config={config}
        studentId={studentId}
        onStart={handleStartExam}
      />
    );
  }

  if (phase === 'result' && result) {
    return (
      <ExamResultScreen
        result={result}
        config={config}
        questions={questions}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    );
  }

  // Exam phase
  return (
    <div className="exam-container flex flex-col min-h-screen">
      {/* Tab Leave Warning */}
      {showWarning && (
        <TabLeaveWarning
          tabLeaveCount={tabLeaveCount}
          onDismiss={dismissWarning}
        />
      )}

      {/* Header */}
      <ExamHeader
        studentId={studentId}
        category={config.category}
        formattedTime={formattedTime}
        isWarning={isWarning}
        isCritical={isCritical}
      />

      {/* Question Content */}
      <main className="flex-1 p-4 md:p-8 pb-28 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {currentQuestion && (
            <ExamQuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={currentAnswer}
              onSelectAnswer={handleSelectAnswer}
            />
          )}
        </div>
      </main>

      {/* Navigation */}
      <ExamNavigation
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        hasSelectedAnswer={!!currentAnswer}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
