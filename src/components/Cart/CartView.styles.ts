import styled from 'styled-components';
import { Link } from '@/i18n/navigation';
import { RowGrid } from './CartRow.styles';

export const Main = styled.main`
  padding-block: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
`;

export const Heading = styled.h1`
  margin-block-end: ${({ theme }) => theme.spacing.lg};
  font-size: 28px;
`;

// Summary sits under the items on mobile/tablet and beside them (sticky) on desktop.
export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: start;

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 320px;
  }
`;

export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const HeaderRow = styled(RowGrid).attrs({ as: 'div' })`
  display: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ theme }) => theme.media.desktop} {
    display: grid;
  }

  span:first-child {
    grid-column: 1 / 3;
  }

  span:last-child {
    text-align: end;
  }
`;

export const List = styled.ul`
  list-style: none;
`;

export const Summary = styled(Panel).attrs({ as: 'section' })`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.desktop} {
    position: sticky;
    top: 100px;
  }

  h2 {
    font-size: 18px;
  }

  dl {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  dl div {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};
  }

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .total {
    padding-block-start: ${({ theme }) => theme.spacing.sm};
    border-block-start: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 18px;
    font-weight: 800;
  }

  .total dt {
    color: inherit;
  }
`;

export const Note = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BrowseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
`;
