'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { useCategoryLabel } from './useCategoryLabel';

const List = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-block-end: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  scrollbar-width: thin;

  ${({ theme }) => theme.media.tablet} {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

const Chip = styled.button<{ $active: boolean }>`
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.onAccent : theme.colors.text)};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

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
