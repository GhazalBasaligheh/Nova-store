'use client';

import Image from 'next/image';
import { Rating } from '@/shared/ui/Rating';
import type { Product } from '@/types/product';
import { useCategoryLabel } from '@/shared/hooks/useCategoryLabel';
import { usePrice } from '@/shared/hooks/usePrice';
import { Card, Media, Body, CategoryText, Title, Footer, Price } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  // Add-to-cart control is injected by the cart step so the card stays presentational.
  action?: React.ReactNode;
  priority?: boolean;
}

export function ProductCard({ product, action, priority = false }: ProductCardProps) {
  const price = usePrice();
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
          <Price>{price(product.price)}</Price>
          {action}
        </Footer>
      </Body>
    </Card>
  );
}
