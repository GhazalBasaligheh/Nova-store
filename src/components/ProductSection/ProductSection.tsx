'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useTransition } from 'react';
import { AlertIcon, SearchIcon } from '@/assets/Icons';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Pagination } from '@/shared/ui/Pagination';
import { StatePanel } from '@/shared/ui/StatePanel';
import type { ServerCatalogResult } from '@/types/catalog';
import { filterSortPaginate } from '@/utils/filterSortPaginate';
import { PRODUCTS_ANCHOR } from '@/utils/routes';
import { scrollToProducts } from '@/utils/scrollToProducts';
import { AddToCartButton } from './AddToCartButton';
import { CategoryChips } from './CategoryChips';
import { ProductGrid, ProductGridSkeleton } from './ProductGrid';
import { ProductToolbar } from './ProductToolbar';
import { useProductQuery } from './hooks/useProductQuery';
import { useRouter } from '@/i18n/navigation';
import { Section, Stack, Heading } from './ProductSection.styles';

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
                    onChange={(page) => {
                      setPage(page);
                      scrollToProducts();
                    }}
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
