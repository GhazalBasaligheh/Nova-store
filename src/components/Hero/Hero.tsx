'use client';

import { useTranslations } from 'next-intl';
import { BagIcon } from '@/assets/Icons';
import { Container } from '@/shared/ui/Container';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { Wrapper, Panel, Copy, Eyebrow, Title, Subtitle, Cta, Art } from './Hero.styles';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <Wrapper>
      <Container>
        <Panel>
          <Copy>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <Title>{t('title')}</Title>
            <Subtitle>{t('subtitle')}</Subtitle>
            <Cta href={{ pathname: routes.home, hash: PRODUCTS_ANCHOR }}>{t('cta')}</Cta>
          </Copy>
          <Art aria-hidden="true">
            <BagIcon size={140} />
          </Art>
        </Panel>
      </Container>
    </Wrapper>
  );
}
