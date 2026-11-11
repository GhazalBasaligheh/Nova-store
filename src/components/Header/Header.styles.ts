import styled from 'styled-components';
import { Link } from '@/i18n/navigation';
import { IconButton } from '@/shared/ui/Button';

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.onHeader};
`;

// Mobile: [logo | actions] then full-width search. Desktop: logo, nav, search, actions in one row.
export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'logo actions'
    'search search'
    'nav nav';
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: auto auto 1fr auto;
    grid-template-areas: 'logo nav search actions';
    gap: ${({ theme }) => theme.spacing.lg};
    padding-block: ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(Link)`
  grid-area: logo;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.04em;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Nav = styled.nav<{ $open: boolean }>`
  grid-area: nav;
  display: ${({ $open }) => ($open ? 'block' : 'none')};

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  a {
    display: block;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-weight: 500;
  }

  a:hover {
    background: rgb(255 255 255 / 10%);
  }

  ${({ theme }) => theme.media.desktop} {
    display: block;

    ul {
      flex-direction: row;
      gap: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

export const SearchArea = styled.div`
  grid-area: search;
`;

export const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CartLink = styled(Link)`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover {
    background: rgb(255 255 255 / 10%);
  }
`;

export const MenuButton = styled(IconButton)`
  ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`;
