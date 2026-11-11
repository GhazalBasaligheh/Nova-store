import styled from 'styled-components';
import { Link } from '@/i18n/navigation';

export const SwitchLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
