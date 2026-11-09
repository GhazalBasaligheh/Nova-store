'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { BagIcon } from '@/assets/Icons';
import { Link } from '@/i18n/navigation';
import { Container } from '@/shared/Container';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';

const Wrapper = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.desktop} {
    padding-block: ${({ theme }) => theme.spacing.xxl};
  }
`;

const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  /* Two columns from tablet up, so the artwork never stacks as a tall block above the products. */
  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1.4fr 1fr;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1.2fr 1fr;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  justify-items: start;
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 30px;
  line-height: 1.3;

  ${({ theme }) => theme.media.desktop} {
    font-size: 44px;
  }
`;

const Subtitle = styled.p`
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 17px;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

// Decorative brand artwork (no photo asset is provided with the brief).
const Art = styled.div`
  display: none;
  place-items: center;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};
  background:
    radial-gradient(circle at 30% 30%, rgb(249 115 22 / 35%), transparent 55%),
    ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.accent};

  ${({ theme }) => theme.media.tablet} {
    display: grid;
  }
`;

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
