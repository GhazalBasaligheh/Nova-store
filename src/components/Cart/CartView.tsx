'use client';

import { useTranslations } from 'next-intl';
import { CartIcon } from '@/assets/Icons';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Skeleton } from '@/shared/ui/Skeleton';
import { StatePanel } from '@/shared/ui/StatePanel';
import { selectItemCount, selectSubtotal, useCartStore } from '@/storage/cartStore';
import { useCartHydrated } from '@/storage/useCartHydration';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { CartRow } from './CartRow';
import { RowGrid } from './CartRow.styles';
import { usePrice } from '@/shared/hooks/usePrice';
import {
  Main,
  Heading,
  Layout,
  Panel,
  HeaderRow,
  List,
  Summary,
  Note,
  BrowseLink,
} from './CartView.styles';

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
