import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;

  /* Mobile: one row that scrolls sideways by touch or by dragging with the mouse, with no
     scrollbar. The padding keeps the chips' focus ring from being clipped. */
  overflow-x: auto;
  padding-block: ${({ theme }) => theme.spacing.xs};
  cursor: grab;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &[data-dragging='true'] {
    cursor: grabbing;
    user-select: none;
  }

  ${({ theme }) => theme.media.tablet} {
    flex-wrap: wrap;
    overflow-x: visible;
    cursor: auto;
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
