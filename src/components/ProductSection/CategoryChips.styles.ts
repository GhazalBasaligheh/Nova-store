import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-block-end: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  scrollbar-width: thin;

  ${({ theme }) => theme.media.tablet} {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

export const Chip = styled.button<{ $active: boolean }>`
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.onAccent : theme.colors.text)};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
