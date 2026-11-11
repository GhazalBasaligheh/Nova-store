'use client';

import { useTranslations } from 'next-intl';
import { useCategoryLabel } from '@/shared/hooks/useCategoryLabel';
import { List, Chip } from './CategoryChips.styles';

interface CategoryChipsProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  const t = useTranslations('Categories');
  const label = useCategoryLabel();

  return (
    <List aria-label={t('heading')}>
      <li>
        <Chip
          type="button"
          $active={!selected}
          aria-pressed={!selected}
          onClick={() => onSelect(null)}
        >
          {t('all')}
        </Chip>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Chip
            type="button"
            $active={selected === category}
            aria-pressed={selected === category}
            onClick={() => onSelect(category)}
          >
            {label(category)}
          </Chip>
        </li>
      ))}
    </List>
  );
}
