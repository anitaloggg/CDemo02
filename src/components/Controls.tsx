import { Play, Pause, Square, SkipForward } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({
  isRunning = false,
  onToggle = () => {},
  onReset = () => {},
  onSkip = () => {},
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        onClick={onReset}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/45 backdrop-blur-sm border border-white/40 text-text-muted hover:bg-white/60 hover:text-text-base hover:shadow-glass hover:-translate-y-0.5 transition-all duration-200"
        title="重置"
      >
        <Square fill="currentColor" size={20} />
      </button>

      <button
        onClick={onToggle}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-brand-primary text-white shadow-glass hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-200"
        title={isRunning ? "暫停" : "開始"}
      >
        {isRunning ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} className="ml-1" />}
      </button>

      <button
        onClick={onSkip}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/45 backdrop-blur-sm border border-white/40 text-text-muted hover:bg-white/60 hover:text-text-base hover:shadow-glass hover:-translate-y-0.5 transition-all duration-200"
        title="跳過此階段"
      >
        <SkipForward fill="currentColor" size={20} />
      </button>
    </div>
  );
}
