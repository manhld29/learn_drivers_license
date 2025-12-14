import { Topic, TOPICS } from '@/types/exam';
import { BookOpen, SignpostBig, Image, Car, Wrench, AlertTriangle, ChevronRight, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicSelectorProps {
  selectedTopic: string | null;
  onSelectTopic: (topicId: string | null) => void;
  topicQuestionCounts: Record<string, number>;
}

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  SignpostBig: <SignpostBig className="w-6 h-6" />,
  Image: <Image className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6" />,
};

export const TopicSelector = ({
  selectedTopic,
  onSelectTopic,
  topicQuestionCounts,
}: TopicSelectorProps) => {
  const totalQuestions = Object.values(topicQuestionCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {/* All Topics Option */}
      <button
        onClick={() => onSelectTopic(null)}
        className={cn(
          "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4",
          selectedTopic === null
            ? "border-primary bg-primary/10 shadow-lg"
            : "border-border bg-card hover:border-primary/50"
        )}
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          selectedTopic === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          <Shuffle className="w-6 h-6" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-foreground">Tất cả chủ đề</h3>
          <p className="text-sm text-muted-foreground">Luyện tập ngẫu nhiên tất cả câu hỏi</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-muted px-3 py-1 rounded-lg text-sm font-medium text-muted-foreground">
            {totalQuestions} câu
          </span>
          {selectedTopic === null && <ChevronRight className="w-5 h-5 text-primary" />}
        </div>
      </button>

      {/* Topic List */}
      <div className="grid gap-3">
        {TOPICS.map((topic) => {
          const questionCount = topicQuestionCounts[topic.id] || 0;
          const isSelected = selectedTopic === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4",
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                topic.id === 'diem-liet' 
                  ? isSelected ? "bg-destructive text-destructive-foreground" : "bg-destructive/10 text-destructive"
                  : isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {iconMap[topic.icon]}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{topic.name}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-lg text-sm font-medium",
                  topic.id === 'diem-liet' 
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                )}>
                  {questionCount} câu
                </span>
                {isSelected && <ChevronRight className="w-5 h-5 text-primary" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
