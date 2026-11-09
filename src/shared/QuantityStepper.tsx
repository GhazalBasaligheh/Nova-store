'use client';

import { useFormatter } from 'next-intl';
import styled from 'styled-components';

const Group = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const StepButton = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`;

const Value = styled.output`
  min-width: 36px;
  font-weight: 700;
  text-align: center;
`;

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
