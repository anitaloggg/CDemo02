import { useState, useEffect, useCallback, useRef } from 'react';

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroSettings {
  focusTime: number; // in minutes
  shortBreakTime: number;
  longBreakTime: number;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusTime: 40,
  shortBreakTime: 5,
  longBreakTime: 10,
};

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [phase, setPhase] = useState<Phase>('focus');
  const [cycle, setCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  }, []);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const saveSettings = useCallback((newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    if (!isRunning) {
      // update time left if we are paused and in the matching phase
      if (phase === 'focus') setTimeLeft(newSettings.focusTime * 60);
      else if (phase === 'shortBreak') setTimeLeft(newSettings.shortBreakTime * 60);
      else if (phase === 'longBreak') setTimeLeft(newSettings.longBreakTime * 60);
    }
  }, [isRunning, phase]);

  const notify = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = phase === 'focus' ? '專注時間結束！' : '休息時間結束！';
      const body = phase === 'focus' ? '該休息一下了。' : '準備好開始下一次專注了嗎？';
      new Notification(title, { body });
    }
  }, [phase]);

  const switchPhase = useCallback(() => {
    if (phase === 'focus') {
      if (cycle % 2 === 0) {
        setPhase('longBreak');
        setTimeLeft(settings.longBreakTime * 60);
      } else {
        setPhase('shortBreak');
        setTimeLeft(settings.shortBreakTime * 60);
      }
    } else {
      setPhase('focus');
      setCycle((c) => c + 1);
      setTimeLeft(settings.focusTime * 60);
    }
  }, [phase, cycle, settings]);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      notify();
      switchPhase();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, switchPhase, notify]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setPhase('focus');
    setCycle(1);
    setTimeLeft(settings.focusTime * 60);
  };

  const skipPhase = () => {
    setIsRunning(false);
    switchPhase();
  };

  return {
    settings,
    saveSettings,
    phase,
    cycle,
    timeLeft,
    isRunning,
    toggleTimer,
    resetTimer,
    skipPhase,
  };
}
