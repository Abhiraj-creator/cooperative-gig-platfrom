import type { ServiceMode } from '../types';
import { TextRoll } from '@/shared/components';

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
          <TextRoll splitBy="chars">{mode}</TextRoll>
        </button>
      ))}
    </div>
  );
}
