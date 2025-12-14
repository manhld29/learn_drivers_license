import { useEffect, useCallback, useState, useRef } from 'react';

interface AntiCheatState {
  tabLeaveCount: number;
  showWarning: boolean;
  lastLeaveTime: Date | null;
}

interface UseAntiCheatProps {
  isActive: boolean;
  onTabLeave?: (count: number) => void;
}

export function useAntiCheat({ isActive, onTabLeave }: UseAntiCheatProps) {
  const [state, setState] = useState<AntiCheatState>({
    tabLeaveCount: 0,
    showWarning: false,
    lastLeaveTime: null
  });

  const dismissWarning = useCallback(() => {
    setState(prev => ({ ...prev, showWarning: false }));
  }, []);

  // Handle visibility change (tab switching)
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setState(prev => {
          const newCount = prev.tabLeaveCount + 1;
          onTabLeave?.(newCount);
          return {
            ...prev,
            tabLeaveCount: newCount,
            lastLeaveTime: new Date()
          };
        });
      } else {
        setState(prev => ({
          ...prev,
          showWarning: prev.tabLeaveCount > 0
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, onTabLeave]);

  // Handle beforeunload (refresh/close)
  useEffect(() => {
    if (!isActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Bạn sẽ mất bài thi nếu rời khỏi trang. Xác nhận?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isActive]);

  // Block keyboard shortcuts
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F5 (refresh)
      if (e.key === 'F5') {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+R (refresh)
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+W (close tab)
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return {
    ...state,
    dismissWarning
  };
}
