'use client';

import { useFormatter } from 'next-intl';
import { Group, StepButton, Value } from './QuantityStepper.styles';

interface QuantityStepperProps {
  value: number;
  min?: number;
  onDecrement: () => void;
  onIncrement: () => void;
  labels: { group: string; decrease: string; increase: string };
}

export function QuantityStepper({
  value,
  min = 1,
  onDecrement,
  onIncrement,
  labels,
}: QuantityStepperProps) {
  const format = useFormatter();

  return (
    <Group role="group" aria-label={labels.group}>
      <StepButton
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={labels.decrease}
      >
        −
      </StepButton>
      <Value aria-live="polite">{format.number(value)}</Value>
      <StepButton type="button" onClick={onIncrement} aria-label={labels.increase}>
        +
      </StepButton>
    </Group>
  );
}
