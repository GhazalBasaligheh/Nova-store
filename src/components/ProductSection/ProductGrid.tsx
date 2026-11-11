'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Skeleton } from '@/shared/Skeleton';
import type { Product } from '@/types/product';
import { PAGE_SIZE } from '@/utils/filterSortPaginate';
import { Card, Media, ProductCard } from './ProductCard';

// Equal-size cards: 1 column on small phones, 2 from 480px, 3 on desktop.
export const Grid = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  list-style: none;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const SkeletonBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export function ProductGridSkeleton() {
  const t = useTranslations('States');
  return (
    <div role="status" aria-busy="true">
      <VisuallyHidden>{t('loading')}</VisuallyHidden>
      <Grid aria-hidden="true">
        {Array.from({ length: PAGE_SIZE }, (_, i) => (
          <li key={i}>
            <Card>
              <Media />
              <SkeletonBody>
                <Skeleton $width="40%" $height="12px" />
                <Skeleton $height="18px" />
                <Skeleton $width="70%" $height="18px" />
                <Skeleton $width="50%" $height="22px" />
              </SkeletonBody>
            </Card>
          </li>
        ))}
      </Grid>
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  renderAction?: (product: Product) => React.ReactNode;
}

export function ProductGrid({ products, renderAction }: ProductGridProps) {
  return (
    <Grid>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} action={renderAction?.(product)} priority={index < 3} />
        </li>
      ))}
    </Grid>
  );
}
