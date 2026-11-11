'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { ChevronIcon } from '@/assets/Icons';
import { Nav, List, PageButton, Previous } from './Pagination.styles';

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
