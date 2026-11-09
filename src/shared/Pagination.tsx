'use client';

import { useFormatter, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { ChevronIcon } from '@/assets/Icons';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
`;

const PageButton = styled.button<{ $current?: boolean }>`
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

const Previous = styled(ChevronIcon)`
  rotate: 180deg;
`;

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const t = useTranslations('Pagination');
  const format = useFormatter();
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Nav aria-label={t('label')}>
      <List>
        <li>
          <PageButton
            type="button"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label={t('previous')}
          >
            <Previous />
          </PageButton>
        </li>
        {pages.map((n) => (
          <li key={n}>
            <PageButton
              type="button"
              $current={n === page}
              aria-current={n === page ? 'page' : undefined}
              aria-label={t('page', { page: format.number(n) })}
              onClick={() => onChange(n)}
            >
              {format.number(n)}
            </PageButton>
          </li>
        ))}
        <li>
          <PageButton
            type="button"
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages}
            aria-label={t('next')}
          >
            <ChevronIcon />
          </PageButton>
        </li>
      </List>
    </Nav>
  );
}
