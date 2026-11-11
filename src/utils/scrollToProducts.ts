import { PRODUCTS_ANCHOR } from '@/utils/routes';

// Brings the product list into view (the section's scroll margin clears the sticky header).
export function scrollToProducts(): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document
    .getElementById(PRODUCTS_ANCHOR)
    ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}
