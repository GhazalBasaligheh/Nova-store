import styled from 'styled-components';

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Count = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SortField = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SelectWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 12px;
    margin-block: auto;
    pointer-events: none;
  }
`;

export const Select = styled.select`
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md} 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
