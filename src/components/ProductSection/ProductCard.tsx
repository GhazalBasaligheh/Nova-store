'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Rating } from '@/shared/Rating';
import type { Locale } from '@/types/enums/Locale';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';
import { useCategoryLabel } from './useCategoryLabel';
import { Card, Media, Body, CategoryText, Title, Footer, Price } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  // Add-to-cart control is injected by the cart step so the card stays presentational.
  action?: React.ReactNode;
  priority?: boolean;
}

export function ProductCard({ product, action, priority = false }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('Currency');
  const categoryLabel = useCategoryLabel();

  return (
    <Card>
      <Media>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
      </Media>
      <Body>
        <CategoryText>{categoryLabel(product.category)}</CategoryText>
        <Title lang="en" dir="auto" title={product.title}>
          {product.title}
        </Title>
        <Rating rate={product.rating.rate} count={product.rating.count} />
        <Footer>
          <Price>{formatPrice(product.price, locale, t('toman'))}</Price>
          {action}
        </Footer>
      </Body>
    </Card>
  );
}
