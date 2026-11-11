'use client';

import { useTranslations } from 'next-intl';
import heroImage from '@/assets/Images/hero.png';
import { Container } from '@/shared/ui/Container';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { Wrapper, Panel, Copy, Eyebrow, Title, Subtitle, Cta, Art, Photo } from './Hero.styles';

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
          <Art>
            <Photo src={heroImage} alt="" priority sizes="(min-width: 1024px) 480px, 40vw" />
          </Art>
        </Panel>
      </Container>
    </Wrapper>
  );
}
