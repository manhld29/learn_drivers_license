import { Clock, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamHeaderProps {
  studentId: string;
  category: string;
  formattedTime: string;
  isWarning: boolean;
  isCritical: boolean;
}

export function ExamHeader({ 
  studentId, 
  category, 
  formattedTime, 
  isWarning, 
  isCritical 
}: ExamHeaderProps) {
  return (
    <header className="exam-header">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left - Student Info */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm opacity-90">
            <User className="w-4 h-4" />
            <span>{studentId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-bold">Hạng {category}</span>
          </div>
        </div>

        {/* Center - Title (hidden on mobile) */}
        <div className="hidden md:block text-center">
          <h1 className="font-bold text-lg">BÀI THI SÁT HẠCH LÝ THUYẾT</h1>
        </div>

        {/* Right - Timer */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-mono",
          isCritical ? "bg-exam-timer-critical animate-blink" : 
          isWarning ? "bg-exam-timer-warning text-warning-foreground" : 
          "bg-exam-timer-normal"
        )}>
          <Clock className="w-5 h-5" />
          <span className="text-xl font-bold tracking-wider">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}
