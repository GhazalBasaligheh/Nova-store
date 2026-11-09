'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { CartIcon } from '@/assets/Icons';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { Skeleton } from '@/shared/Skeleton';
import { StatePanel } from '@/shared/StatePanel';
import { selectItemCount, selectSubtotal, useCartStore } from '@/storage/cartStore';
import { useCartHydrated } from '@/storage/useCartHydration';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { CartRow, RowGrid } from './CartRow';
import { usePrice } from './usePrice';

const Main = styled.main`
  padding-block: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
`;

const Heading = styled.h1`
  margin-block-end: ${({ theme }) => theme.spacing.lg};
  font-size: 28px;
`;

// Summary sits under the items on mobile/tablet and beside them (sticky) on desktop.
const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: start;

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 320px;
  }
`;

const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

const HeaderRow = styled(RowGrid).attrs({ as: 'div' })`
  display: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ theme }) => theme.media.desktop} {
    display: grid;
  }

  span:first-child {
    grid-column: 1 / 3;
  }

  span:last-child {
    text-align: end;
  }
`;

const List = styled.ul`
  list-style: none;
`;

const Summary = styled(Panel).attrs({ as: 'section' })`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.desktop} {
    position: sticky;
    top: 100px;
  }

  h2 {
    font-size: 18px;
  }

  dl {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  dl div {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};
  }

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .total {
    padding-block-start: ${({ theme }) => theme.spacing.sm};
    border-block-start: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 18px;
    font-weight: 800;
  }

  .total dt {
    color: inherit;
  }
`;

const Note = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const BrowseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
`;

function CartSkeleton({ label }: { label: string }) {
  return (
    <Panel role="status" aria-busy="true" aria-label={label}>
      {[0, 1].map((i) => (
        <RowGrid key={i} as="div" aria-hidden="true">
          <Skeleton $width="72px" $height="72px" />
          <Skeleton $height="18px" />
        </RowGrid>
      ))}
    </Panel>
  );
}

export function CartView() {
  const t = useTranslations('Cart');
  const price = usePrice();
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const count = useCartStore(selectItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const clear = useCartStore((state) => state.clear);

  return (
    <Main>
      <Container>
        <Heading>{t('title')}</Heading>

        {!hydrated ? (
          <CartSkeleton label={t('loading')} />
        ) : items.length === 0 ? (
          <StatePanel
            icon={<CartIcon size={32} />}
            title={t('emptyTitle')}
            description={t('emptyBody')}
            action={
              <BrowseLink href={{ pathname: routes.home, hash: PRODUCTS_ANCHOR }}>
                {t('browse')}
              </BrowseLink>
            }
          />
        ) : (
          <Layout>
            <Panel>
              <HeaderRow aria-hidden="true">
                <span>{t('product')}</span>
                <span>{t('unitPrice')}</span>
                <span>{t('quantity')}</span>
                <span>{t('rowTotal')}</span>
              </HeaderRow>
              <List>
                {items.map((item) => (
                  <CartRow key={item.id} item={item} />
                ))}
              </List>
            </Panel>

            <Summary aria-labelledby="cart-summary">
              <h2 id="cart-summary">{t('summary')}</h2>
              <dl>
                <div>
                  <dt>{t('items', { count })}</dt>
                  <dd>{price(subtotal)}</dd>
                </div>
                <div className="total">
                  <dt>{t('total')}</dt>
                  <dd>{price(subtotal)}</dd>
                </div>
              </dl>
              <Button type="button" $variant="ghost" $fullWidth onClick={clear}>
                {t('clear')}
              </Button>
              <Note>{t('checkoutNote')}</Note>
            </Summary>
          </Layout>
        )}
      </Container>
    </Main>
  );
}
