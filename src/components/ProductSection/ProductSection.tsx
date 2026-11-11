'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useTransition } from 'react';
import styled from 'styled-components';
import { AlertIcon, SearchIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { Pagination } from '@/shared/Pagination';
import { StatePanel } from '@/shared/StatePanel';
import type { ServerCatalogResult } from '@/types/catalog';
import { filterSortPaginate } from '@/utils/productQuery';
import { PRODUCTS_ANCHOR } from '@/utils/routes';
import { AddToCartButton } from './AddToCartButton';
import { CategoryChips } from './CategoryChips';
import { ProductGrid, ProductGridSkeleton } from './ProductGrid';
import { ProductToolbar } from './ProductToolbar';
import { useProductQuery } from './useProductQuery';
import { useRouter } from '@/i18n/navigation';

const Section = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xxl};
  scroll-margin-block-start: 120px;
`;

const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Heading = styled.h2`
  font-size: 24px;

  ${({ theme }) => theme.media.desktop} {
    font-size: 28px;
  }
`;

interface ProductSectionProps {
  server: ServerCatalogResult;
}

export function ProductSection({ server }: ProductSectionProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();
  const catalog = server.status === 'ready' ? server.catalog : null;
  const retry = () => startTransition(() => router.refresh());
  const { query, setCategory, setSort, setPage, clearFilters } = useProductQuery();

  const result = useMemo(
    () => (catalog ? filterSortPaginate(catalog.products, query) : null),
    [catalog, query],
  );

  return (
    <Section id={PRODUCTS_ANCHOR} aria-labelledby="products-heading">
      <Container>
        <Stack>
          <Heading id="products-heading">{t('Products.heading')}</Heading>

          {isRetrying && <ProductGridSkeleton />}

          {!isRetrying && !catalog && (
            <StatePanel
              tone="danger"
              icon={<AlertIcon size={32} />}
              title={t('States.errorTitle')}
              description={t('States.errorBody')}
              action={
                <Button type="button" onClick={retry}>
                  {t('States.retry')}
                </Button>
              }
            />
          )}

          {!isRetrying && catalog && result && (
            <>
              <CategoryChips
                categories={catalog.categories}
                selected={query.category}
                onSelect={setCategory}
              />
              <ProductToolbar total={result.total} sort={query.sort} onSortChange={setSort} />

              {result.total === 0 ? (
                <StatePanel
                  icon={<SearchIcon size={32} />}
                  title={t('States.emptyTitle')}
                  description={t('States.emptyBody')}
                  action={
                    <Button type="button" $variant="ghost" onClick={clearFilters}>
                      {t('Products.clearFilters')}
                    </Button>
                  }
                />
              ) : (
                <>
                  <ProductGrid
                    products={result.items}
                    renderAction={(product) => <AddToCartButton product={product} />}
                  />
                  <Pagination
                    page={result.page}
                    totalPages={result.totalPages}
                    onChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
