import { useState, useEffect } from 'react';
import type { PomodoroSettings } from '../hooks/usePomodoro';
import { X, Settings as SettingsIcon } from 'lucide-react';

interface SettingsPanelProps {
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
}

export function SettingsPanel({ settings, onSave }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<PomodoroSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key: keyof PomodoroSettings, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setLocalSettings((prev) => ({ ...prev, [key]: numValue }));
    } else if (value === '') {
      // allow empty string temporarily for typing
      setLocalSettings((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleSave = () => {
    // Prevent 0 or negative values
    const validSettings = {
      focusTime: Math.max(1, localSettings.focusTime),
      shortBreakTime: Math.max(1, localSettings.shortBreakTime),
      longBreakTime: Math.max(1, localSettings.longBreakTime),
    };
    onSave(validSettings);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/45 backdrop-blur-sm border border-white/40 text-text-muted hover:bg-white/70 hover:text-text-base hover:shadow-glass hover:-translate-y-0.5 transition-all duration-200 z-10"
        title="設定"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/5 backdrop-blur-sm transition-all">
          <div className="bg-white/88 backdrop-blur-xl border border-white/70 shadow-glass-lg rounded-3xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/40">
              <h3 className="text-lg font-semibold text-text-base">計時器設定</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-base transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-muted">專注時間 (分鐘)</label>
                <input
                  type="number"
                  min="1"
                  value={localSettings.focusTime || ''}
                  onChange={(e) => handleChange('focusTime', e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-muted">短休息 (分鐘)</label>
                <input
                  type="number"
                  min="1"
                  value={localSettings.shortBreakTime || ''}
                  onChange={(e) => handleChange('shortBreakTime', e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-muted">長休息 (分鐘)</label>
                <input
                  type="number"
                  min="1"
                  value={localSettings.longBreakTime || ''}
                  onChange={(e) => handleChange('longBreakTime', e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-text-base"
                />
              </div>
            </div>

            <div className="p-6 pt-2">
              <button
                onClick={handleSave}
                className="w-full py-3 rounded-xl bg-brand-primary text-white font-medium shadow-glass hover:shadow-glass-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                儲存設定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
