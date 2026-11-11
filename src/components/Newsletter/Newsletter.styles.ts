import styled from 'styled-components';

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
`;

export const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const Heading = styled.h2`
  margin-block-end: ${({ theme }) => theme.spacing.xs};
  font-size: 24px;
`;

export const Muted = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input<{ $invalid: boolean }>`
  flex: 1;
  min-height: 48px;
  padding-inline: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const SuccessText = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
`;
