'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CartIcon } from '@/assets/Icons';
import { Button } from '@/shared/ui/Button';
import { useCartStore } from '@/storage/cartStore';
import type { Product } from '@/types/product';

const FEEDBACK_MS = 1500;

export function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations('AddToCart');
  const add = useCartStore((state) => state.add);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <Button
      type="button"
      $fullWidth
      $variant={added ? 'secondary' : 'primary'}
      aria-label={t('addItem', { title: product.title })}
      onClick={() => {
        add(product);
        setAdded(true);
      }}
    >
      <CartIcon size={18} />
      {/* Visible text changes for sighted users; the live region announces it. */}
      <span aria-live="polite">{added ? t('added') : t('add')}</span>
    </Button>
  );
}
