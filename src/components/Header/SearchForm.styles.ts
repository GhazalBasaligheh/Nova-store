import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md} 48px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;

export const Submit = styled.button`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  display: grid;
  place-items: center;
  width: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
`;

export const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
