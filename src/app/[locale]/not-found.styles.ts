import styled from 'styled-components';
import { Link } from '@/i18n/navigation';

export const Main = styled.main`
  padding-block: ${({ theme }) => theme.spacing.xxl};
`;

export const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
`;
