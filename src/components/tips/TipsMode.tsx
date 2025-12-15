import React, { useState, useEffect } from 'react';
import { tipsData, mockQuestionsB2 } from '@/data/mockQuestions';
import { Tip } from '@/types/exam';
import { ChevronLeft, Lightbulb, BookOpen, AlertCircle, Trash2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PracticeQuestionCard } from '@/components/practice/PracticeQuestionCard';

interface TipsModeProps {
    onExit: () => void;
}

export const TipsMode: React.FC<TipsModeProps> = ({ onExit }) => {
    const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResetMenu, setShowResetMenu] = useState(false);

    // Persistence: Answers
    const [answers, setAnswers] = useState<Record<number, string>>(() => {
        const saved = localStorage.getItem('tips_answers');
        return saved ? JSON.parse(saved) : {};
    });

    // Persistence: ShowResults
    const [showResults, setShowResults] = useState<Record<number, boolean>>(() => {
        const saved = localStorage.getItem('tips_answers');
        if (!saved) return {};
        const parsed = JSON.parse(saved);
        return Object.keys(parsed).reduce((acc, key) => ({
            ...acc,
            [Number(key)]: true
        }), {});
    });

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('tips_answers', JSON.stringify(answers));
    }, [answers]);

    // Helper to get questions for a tip
    const getQuestionsForTip = (tip: Tip) => {
        // Map through the question IDs in the tip to preserve order
        return tip.questions
            .map(id => mockQuestionsB2.find(q => q.id.toString() === id))
            .filter((q): q is typeof mockQuestionsB2[0] => !!q);
    };

    const handleSelectTip = (tip: Tip) => {
        setSelectedTip(tip);
        // Reset index but KEEP answers (global persistence)
        setCurrentQuestionIndex(0);
        window.scrollTo(0, 0);
    };

    const handleClearAll = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài Mẹo?')) {
            setAnswers({});
            setShowResults({});
            localStorage.removeItem('tips_answers');
            setShowResetMenu(false);
        }
    };

    const handleClearCurrent = (currentQuestionId?: number) => {
        if (!currentQuestionId) return;

        const newAnswers = { ...answers };
        delete newAnswers[currentQuestionId];
        setAnswers(newAnswers);

        const newShowResults = { ...showResults };
        delete newShowResults[currentQuestionId];
        setShowResults(newShowResults);

        setShowResetMenu(false);
    };

    const handleSelectAnswer = (questionId: number, answer: string) => {
        if (showResults[questionId]) return;

        setAnswers(prev => ({ ...prev, [questionId]: answer }));
        setShowResults(prev => ({ ...prev, [questionId]: true }));
    };

    if (selectedTip) {
        const questions = getQuestionsForTip(selectedTip);
        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b shrink-0 shadow-sm z-20">
                    <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                        <button
                            onClick={() => setSelectedTip(null)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex-1">
                            <h1 className="font-bold text-lg md:text-xl line-clamp-1" dangerouslySetInnerHTML={{ __html: selectedTip.tip }} />
                            <p className="text-sm text-muted-foreground">
                                Câu {currentQuestionIndex + 1}/{questions.length}
                            </p>
                        </div>

                        {/* Reset Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowResetMenu(!showResetMenu)}
                                className="p-2 hover:bg-gray-100 rounded-full text-muted-foreground hover:text-destructive transition-colors relative z-10"
                                title="Tùy chọn"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            {showResetMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <button
                                        onClick={() => handleClearCurrent(currentQuestion?.id)}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm flex items-center gap-2"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Làm lại câu này
                                    </button>
                                    <button
                                        onClick={handleClearAll}
                                        className="w-full text-left px-4 py-3 hover:bg-red-50 text-destructive text-sm flex items-center gap-2 border-t"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Xóa toàn bộ
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content - Split View */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Left Pane: Sticky Tip (Scrollable if content is long) */}
                    <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r bg-amber-50/50 p-6 overflow-y-auto shrink-0 md:h-full max-h-[40vh] md:max-h-full">
                        <div className="bg-white/80 border border-amber-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg text-amber-900">Mẹo ghi nhớ</h3>
                            </div>

                            <div
                                className="text-amber-800 text-lg mb-4"
                                dangerouslySetInnerHTML={{ __html: selectedTip.tip }}
                            />

                            {selectedTip.image && (
                                <div className="mt-4">
                                    <img
                                        src={selectedTip.image}
                                        alt="Hình ảnh mẹo"
                                        className="rounded-lg shadow-sm border border-amber-200 w-full h-auto object-contain bg-white"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Pane: Question (Paginated) */}
                    <div className="flex-1 bg-gray-50/50 p-4 md:p-8 overflow-y-auto flex flex-col items-center">
                        <div className="w-full max-w-3xl">
                            {currentQuestion ? (
                                <div className="space-y-6">
                                    <PracticeQuestionCard
                                        question={{
                                            ...currentQuestion,
                                            question: `Câu ${currentQuestion.id}: ${currentQuestion.question}`
                                        }}
                                        questionNumber={currentQuestionIndex + 1}
                                        totalQuestions={questions.length}
                                        selectedAnswer={answers[currentQuestion.id] || null}
                                        onSelectAnswer={(answer) => handleSelectAnswer(currentQuestion.id, answer)}
                                        showResult={showResults[currentQuestion.id] || false}
                                    />

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between items-center pt-4">
                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                            disabled={currentQuestionIndex === 0}
                                            className="px-6 py-3 rounded-xl font-semibold bg-white border shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                            Câu trước
                                        </button>

                                        <div className="text-sm font-medium text-muted-foreground hidden sm:block">
                                            Câu {currentQuestionIndex + 1} / {questions.length}
                                        </div>

                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                            disabled={currentQuestionIndex === questions.length - 1}
                                            className="px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            Câu sau
                                            <ChevronLeft className="w-5 h-5 rotate-180" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Không tìm thấy câu hỏi nào cho mẹo này.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={onExit}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <h1 className="font-bold text-xl">Mẹo thi 600 câu</h1>
                    </div>
                </div>
            </header>

            {/* Tip List */}
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tipsData.tips.map((tip, idx) => {
                        const completedCount = tip.questions.filter(qId => answers[Number(qId)]).length;
                        const isCompleted = completedCount > 0 && completedCount === tip.questions.length;

                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelectTip(tip)}
                                className={cn(
                                    "bg-card hover:bg-accent/50 border-2 rounded-xl p-5 text-left transition-all hover:shadow-md group h-full flex flex-col relative overflow-hidden",
                                    isCompleted
                                        ? "border-success/50 bg-success/5"
                                        : "border-border hover:border-primary/50"
                                )}
                            >
                                {isCompleted && (
                                    <div className="absolute top-0 right-0 p-1.5 bg-success text-success-foreground rounded-bl-xl shadow-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-3 w-full pr-6">
                                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                                        Mẹo #{idx + 1}
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs font-medium",
                                        completedCount === tip.questions.length ? "text-success" : "text-muted-foreground"
                                    )}>
                                        <BookOpen className="w-3 h-3" />
                                        <span>{completedCount}/{tip.questions.length} câu</span>
                                    </div>
                                </div>

                                <div
                                    className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-2 flex-grow"
                                    dangerouslySetInnerHTML={{ __html: tip.tip }}
                                />
                            </button>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};
