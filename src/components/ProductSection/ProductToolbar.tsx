'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { ChevronDownIcon } from '@/assets/Icons';
import { SortKey } from '@/types/enums/SortKey';
import { Bar, Count, SortField, SelectWrap, Select } from './ProductToolbar.styles';

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
