'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { StarIcon } from '@/assets/Icons';
import { Wrapper, Stars } from './Rating.styles';

interface RatingProps {
  rate: number;
  count: number;
}

// Five stars rounded to the nearest whole star; exact value is in the text and the accessible name.
export function Rating({ rate, count }: RatingProps) {
  const t = useTranslations('Products');
  const format = useFormatter();
  const rounded = Math.round(rate);
  const rateText = format.number(rate, { maximumFractionDigits: 1 });

  return (
    <Wrapper
      role="img"
      aria-label={t('ratingLabel', { rate: rateText, count: format.number(count) })}
    >
      <Stars aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} size={14} filled={star <= rounded} />
        ))}
      </Stars>
      <span aria-hidden="true">
        {rateText} ({format.number(count)})
      </span>
    </Wrapper>
  );
}
