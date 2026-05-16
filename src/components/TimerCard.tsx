import type { Phase } from '../hooks/usePomodoro';

interface TimerCardProps {
  timeLeft: number;
  phase: Phase;
  cycle: number;
}

export function TimerCard({ timeLeft, phase, cycle }: TimerCardProps) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  const phaseText = {
    focus: '專注時間',
    shortBreak: '短休息',
    longBreak: '長休息',
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 shadow-glass rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-300 w-full max-w-md mx-auto">
      <div className="mb-4 px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent font-medium text-sm tracking-wide">
        第 {cycle} 循環
      </div>
      <h2 className="text-2xl font-medium text-text-muted mb-2">{phaseText[phase]}</h2>
      <div className="text-[5.5rem] leading-none font-bold text-text-base tracking-tighter mb-4 tabular-nums">
        {minutes}:{seconds}
      </div>
    </div>
  );
}
