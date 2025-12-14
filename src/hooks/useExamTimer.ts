import { useState, useEffect, useCallback, useRef } from 'react';

interface UseExamTimerProps {
  totalMinutes: number;
  onTimeUp: () => void;
  isActive: boolean;
}

interface TimerState {
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isWarning: boolean;
  isCritical: boolean;
  formattedTime: string;
}

export function useExamTimer({ totalMinutes, onTimeUp, isActive }: UseExamTimerProps): TimerState {
  const [totalSeconds, setTotalSeconds] = useState(totalMinutes * 60);
  const onTimeUpRef = useRef(onTimeUp);
  
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTotalSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const isWarning = totalSeconds <= 300 && totalSeconds > 60; // <= 5 minutes
  const isCritical = totalSeconds <= 60; // <= 1 minute

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    minutes,
    seconds,
    totalSeconds,
    isWarning,
    isCritical,
    formattedTime
  };
}
