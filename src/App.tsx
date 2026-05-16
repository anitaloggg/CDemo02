import { usePomodoro } from './hooks/usePomodoro';
import { TimerCard } from './components/TimerCard';
import { Controls } from './components/Controls';
import { SettingsPanel } from './components/SettingsPanel';

function App() {
  const {
    settings,
    saveSettings,
    phase,
    cycle,
    timeLeft,
    isRunning,
    toggleTimer,
    resetTimer,
    skipPhase,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 font-sans">
      <SettingsPanel settings={settings} onSave={saveSettings} />
      
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-text-base tracking-tight">Pomodoro</h1>
          <p className="text-text-muted mt-2">保持專注，適時休息</p>
        </div>

        <TimerCard timeLeft={timeLeft} phase={phase} cycle={cycle} />
        
        <Controls
          isRunning={isRunning}
          onToggle={toggleTimer}
          onReset={resetTimer}
          onSkip={skipPhase}
        />
      </div>
    </div>
  );
}

export default App;
