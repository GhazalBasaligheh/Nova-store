'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/Skeleton';
import type { Product } from '@/types/product';
import { PAGE_SIZE } from '@/utils/filterSortPaginate';
import { ProductCard } from './ProductCard';
import { Card, Media } from './ProductCard.styles';
import { Grid, SkeletonBody, VisuallyHidden } from './ProductGrid.styles';

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
