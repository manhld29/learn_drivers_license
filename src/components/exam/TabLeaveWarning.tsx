import { AlertTriangle, X } from 'lucide-react';

interface TabLeaveWarningProps {
  tabLeaveCount: number;
  onDismiss: () => void;
}

export function TabLeaveWarning({ tabLeaveCount, onDismiss }: TabLeaveWarningProps) {
  return (
    <div className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="w-8 h-8 animate-shake" />
            <h2 className="text-xl font-bold">CẢNH BÁO</h2>
          </div>
          <button 
            onClick={onDismiss}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg text-foreground">
            Bạn đã rời khỏi màn hình thi!
          </p>
          
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-sm text-foreground">
              Số lần rời màn hình: <strong className="text-destructive">{tabLeaveCount}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Hành vi này đã được ghi lại. Vui lòng không rời khỏi màn hình thi trong quá trình làm bài.
            </p>
          </div>

          <button
            onClick={onDismiss}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            TIẾP TỤC LÀM BÀI
          </button>
        </div>
      </div>
    </div>
  );
}
