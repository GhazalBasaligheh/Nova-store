'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CloseIcon } from '@/assets/Icons';
import { QuantityStepper } from '@/shared/ui/QuantityStepper';
import { useCartStore, type CartItem } from '@/storage/cartStore';
import { usePrice } from '@/shared/hooks/usePrice';
import {
  RowGrid,
  Thumb,
  Info,
  Title,
  RemoveButton,
  Unit,
  Qty,
  Total,
  MobileLabel,
} from './CartRow.styles';

export function CartRow({ item }: { item: CartItem }) {
  const t = useTranslations('Cart');
  const price = usePrice();
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const remove = useCartStore((state) => state.remove);

  return (
    <RowGrid>
      <Thumb>
        <Image src={item.image} alt="" fill sizes="72px" />
      </Thumb>
      <Info>
        <Title lang="en" dir="auto" title={item.title}>
          {item.title}
        </Title>
        <RemoveButton
          type="button"
          onClick={() => remove(item.id)}
          aria-label={t('removeItem', { title: item.title })}
        >
          <CloseIcon size={18} />
        </RemoveButton>
      </Info>
      <Unit>
        <MobileLabel>{t('unitPrice')}: </MobileLabel>
        {price(item.price)}
      </Unit>
      <Qty>
        <QuantityStepper
          value={item.quantity}
          onDecrement={() => decrement(item.id)}
          onIncrement={() => increment(item.id)}
          labels={{
            group: t('quantityOf', { title: item.title }),
            decrease: t('decrease'),
            increase: t('increase'),
          }}
        />
      </Qty>
      <Total>{price(item.price * item.quantity)}</Total>
    </RowGrid>
  );
}
