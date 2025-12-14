import { useState } from 'react';
import { EXAM_CONFIGS } from '@/types/exam';
import { RealExamMode } from '@/components/exam/RealExamMode';
import { PracticeMode } from '@/components/practice';
import { TipsMode } from '@/components/tips/TipsMode';
import { FileText, Award, Clock, AlertTriangle, ChevronRight, BookOpen, GraduationCap, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppMode = 'home' | 'exam' | 'practice' | 'tips';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [appMode, setAppMode] = useState<AppMode>('home');

  const categories = Object.values(EXAM_CONFIGS);

  if (appMode === 'exam' && selectedCategory) {
    return (
      <RealExamMode
        category={selectedCategory}
        onExit={() => {
          setAppMode('home');
          setSelectedCategory(null);
        }}
      />
    );
  }

  if (appMode === 'practice') {
    return (
      <PracticeMode
        onExit={() => setAppMode('home')}
      />
    );
  }

  if (appMode === 'tips') {
    return (
      <TipsMode
        onExit={() => setAppMode('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-exam-header text-exam-header-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl font-bold">
              THI SÁT HẠCH GPLX
            </h1>
          </div>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Hệ thống thi thử giấy phép lái xe theo đề chuẩn Bộ Công an
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">

          {/* Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Practice Mode Card */}
            <button
              onClick={() => setAppMode('practice')}
              className="group p-6 rounded-xl border-2 border-border bg-card hover:border-success hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-success/20 text-success rounded-xl flex items-center justify-center group-hover:bg-success group-hover:text-success-foreground transition-colors">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Chế độ Luyện tập</h3>
                  <p className="text-sm text-muted-foreground">Học và xem đáp án ngay</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Xem đáp án + giải thích chi tiết</li>
                <li>✓ Học theo từng chủ đề riêng</li>
                <li>✓ Không giới hạn thời gian</li>
              </ul>
            </button>

            {/* Real Exam Mode Card */}
            <div className="p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Chế độ Thi Thật</h3>
                  <p className="text-sm text-muted-foreground">Mô phỏng sát hạch chính thức</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Không xem lại câu đã trả lời</li>
                <li>• Chế độ toàn màn hình, giới hạn thời gian</li>
                <li>• Điểm liệt = KHÔNG ĐẠT</li>
              </ul>
            </div>

            {/* NEW Tips Mode Card */}
            <button
              onClick={() => setAppMode('tips')}
              className="group p-6 rounded-xl border-2 border-border bg-card hover:border-amber-500 hover:shadow-lg transition-all duration-300 text-left md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Học Mẹo 600 Câu</h3>
                  <p className="text-sm text-muted-foreground">Mẹo ghi nhớ nhanh & chính xác</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Tổng hợp các mẹo thi hay nhất</li>
                <li>✓ Học theo từng nhóm mẹo cụ thể</li>
                <li>✓ Xem câu hỏi áp dụng ngay</li>
              </ul>
            </button>
          </div>

          {/* Category Selection */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Chọn hạng bằng lái xe để thi thật
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((config) => (
              <div
                key={config.category}
                onClick={() => setSelectedCategory(config.category)}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all duration-300 text-left cursor-pointer relative",
                  selectedCategory === config.category
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
                    {config.category}
                  </div>
                  {selectedCategory === config.category && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAppMode('exam');
                      }}
                      className="bg-success text-success-foreground p-2 rounded-full hover:bg-success/90 transition-colors shadow-sm hover:scale-110 active:scale-95"
                      title="Bắt đầu thi ngay"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <h3 className="font-semibold text-foreground mb-3">{config.categoryName}</h3>

                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{config.totalQuestions} câu</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{config.timeMinutes} phút</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{config.diemLietCount} điểm liệt</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Start Exam Button */}
          {selectedCategory && (
            <div className="mt-8 animate-fade-in">
              <button
                onClick={() => setAppMode('exam')}
                className="w-full max-w-md mx-auto block bg-success hover:bg-success/90 text-success-foreground 
                           py-5 px-8 rounded-xl text-xl font-bold
                           transition-all duration-300 transform hover:scale-[1.02]
                           shadow-lg hover:shadow-xl"
              >
                BẮT ĐẦU THI THẬT - HẠNG {selectedCategory}
              </button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4 text-foreground">Hướng dẫn sử dụng</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-success mb-2">Chế độ Luyện tập</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Chọn chủ đề bạn muốn học</li>
                  <li>• Xem đáp án ngay sau khi chọn</li>
                  <li>• Đọc giải thích để hiểu sâu</li>
                  <li>• Không có áp lực thời gian</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Chế độ Thi Thật</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Không xem lại câu hỏi đã trả lời</li>
                  <li>• Không hiển thị đáp án trong quá trình thi</li>
                  <li>• Sai câu điểm liệt = KHÔNG ĐẠT</li>
                  <li>• Tự động nộp khi hết thời gian</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Hệ thống thi thử GPLX - Giao diện mô phỏng theo chuẩn sát hạch chính thức</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
