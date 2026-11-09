'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon } from '@/assets/Icons';
import { SortKey } from '@/types/enums/SortKey';

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SortField = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SelectWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 12px;
    margin-block: auto;
    pointer-events: none;
  }
`;

const Select = styled.select`
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md} 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const SORT_OPTIONS = Object.values(SortKey);

interface ProductToolbarProps {
  total: number;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
}

export function ProductToolbar({ total, sort, onSortChange }: ProductToolbarProps) {
  const t = useTranslations();
  const selectId = useId();

  return (
    <Bar>
      <Count aria-live="polite">{t('Products.results', { count: total })}</Count>
      <SortField>
        <label htmlFor={selectId}>{t('Products.sortLabel')}</label>
        <SelectWrap>
          <Select
            id={selectId}
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((key) => (
              <option key={key} value={key}>
                {t(`Sort.${key}`)}
              </option>
            ))}
          </Select>
          <ChevronDownIcon size={16} />
        </SelectWrap>
      </SortField>
    </Bar>
  );
}
