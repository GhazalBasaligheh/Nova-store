import styled from 'styled-components';
import { ChevronIcon } from '@/assets/Icons';

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
`;

export const PageButton = styled.button<{ $current?: boolean }>`
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $current }) => ($current ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $current }) => ($current ? theme.colors.onPrimary : theme.colors.text)};
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  /* Chevrons point to the inline end; mirror them for RTL. */
  [dir='rtl'] & svg {
    transform: scaleX(-1);
  }
`;

export const Previous = styled(ChevronIcon)`
  rotate: 180deg;
`;
