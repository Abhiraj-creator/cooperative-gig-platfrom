import type { ServiceMode } from '../types';

const modes: ServiceMode[] = ['scheduled', 'on-demand', 'emergency'];

interface ServiceModeSelectorProps {
  value: ServiceMode;
  onChange: (mode: ServiceMode) => void;
}

export function ServiceModeSelector({ value, onChange }: ServiceModeSelectorProps) {
  return (
    <div>
      {modes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          aria-pressed={value === mode}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
