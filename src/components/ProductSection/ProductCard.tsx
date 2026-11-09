'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Rating } from '@/shared/Rating';
import type { Locale } from '@/types/enums/Locale';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/currency';
import { useCategoryLabel } from './useCategoryLabel';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Media = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: #fff;

  img {
    object-fit: contain;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

const CategoryText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// API titles are English; mark them so screen readers pronounce them correctly in the fa locale.
const Title = styled.h3`
  display: -webkit-box;
  min-height: calc(2 * 1.5em);
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block-start: auto;
`;

const Price = styled.p`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

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
        {/* Served straight from the API host: Next's optimizer would fetch it server-side,
            which Cloudflare blocks (see README). */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          unoptimized
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
