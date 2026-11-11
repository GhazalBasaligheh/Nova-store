import { CategorySlug } from '@/types/enums/Category';

// Dictionary key (under "Categories") for each known slug. Slugs contain spaces and
// apostrophes, so they can't be used as message keys directly.
export const categoryLabelKey = {
  [CategorySlug.Electronics]: 'electronics',
  [CategorySlug.Jewelery]: 'jewelery',
  [CategorySlug.Mens]: 'mens',
  [CategorySlug.Womens]: 'womens',
} as const;

export type CategoryLabelKey = (typeof categoryLabelKey)[CategorySlug];

export const KNOWN_CATEGORIES = Object.values(CategorySlug);

export function getCategoryLabelKey(slug: string): CategoryLabelKey | null {
  return (categoryLabelKey as Record<string, CategoryLabelKey>)[slug] ?? null;
}
