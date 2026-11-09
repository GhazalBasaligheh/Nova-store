'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import styled from 'styled-components';
import { AlertIcon, SearchIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { Pagination } from '@/shared/Pagination';
import { StatePanel } from '@/shared/StatePanel';
import type { ServerCatalogResult } from '@/types/catalog';
import { filterSortPaginate } from '@/utils/productQuery';
import { PRODUCTS_ANCHOR } from '@/utils/routes';
import { CategoryChips } from './CategoryChips';
import { ProductGrid, ProductGridSkeleton } from './ProductGrid';
import { ProductToolbar } from './ProductToolbar';
import { useCatalog } from './useCatalog';
import { useProductQuery } from './useProductQuery';

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
  const { state, retry } = useCatalog(server);
  const { query, setCategory, setSort, setPage, clearFilters } = useProductQuery();

  const result = useMemo(
    () => (state.status === 'ready' ? filterSortPaginate(state.catalog.products, query) : null),
    [state, query],
  );

  return (
    <Section id={PRODUCTS_ANCHOR} aria-labelledby="products-heading">
      <Container>
        <Stack>
          <Heading id="products-heading">{t('Products.heading')}</Heading>

          {state.status === 'loading' && <ProductGridSkeleton />}

          {state.status === 'error' && (
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

          {state.status === 'ready' && result && (
            <>
              <CategoryChips
                categories={state.catalog.categories}
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
                  <ProductGrid products={result.items} />
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
