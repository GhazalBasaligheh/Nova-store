'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { BagIcon } from '@/assets/Icons';
import { Container } from '@/shared/Container';

const Wrapper = styled.footer`
  margin-block-start: auto;
  padding-block: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.onHeader};
`;

const Columns = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const Brand = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block-end: ${({ theme }) => theme.spacing.sm};
  font-size: 22px;
  font-weight: 800;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Muted = styled.p`
  opacity: 0.75;
  font-size: 14px;
`;

const Heading = styled.h2`
  margin-block-end: ${({ theme }) => theme.spacing.sm};
  font-size: 16px;
`;

const LinkList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  font-size: 14px;

  a {
    opacity: 0.8;
  }

  a:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Bottom = styled.p`
  margin-block-start: ${({ theme }) => theme.spacing.xl};
  padding-block-start: ${({ theme }) => theme.spacing.lg};
  border-block-start: 1px solid rgb(255 255 255 / 12%);
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
`;

// Placeholder targets: the brief allows non-functional footer links.
const PLACEHOLDER_HREF = '#';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <Wrapper>
      <Container>
        <Columns>
          <div>
            <Brand>
              <BagIcon size={24} />
              {t('Brand.name')}
            </Brand>
            <Muted>{t('Footer.tagline')}</Muted>
          </div>

          <nav aria-labelledby="footer-help">
            <Heading id="footer-help">{t('Footer.help')}</Heading>
            <LinkList>
              {(['faq', 'shipping', 'returns', 'contact'] as const).map((key) => (
                <li key={key}>
                  <a href={PLACEHOLDER_HREF}>{t(`Footer.${key}`)}</a>
                </li>
              ))}
            </LinkList>
          </nav>

          <div>
            <Heading>{t('Footer.storeInfo')}</Heading>
            <LinkList>
              <li>
                <a href={PLACEHOLDER_HREF}>{t('Footer.about')}</a>
              </li>
              <li>{t('Footer.address')}</li>
              <li>{t('Footer.hours')}</li>
            </LinkList>
          </div>

          <nav aria-labelledby="footer-social">
            <Heading id="footer-social">{t('Footer.social')}</Heading>
            <LinkList>
              {(['instagram', 'telegram', 'linkedin'] as const).map((key) => (
                <li key={key}>
                  <a href={PLACEHOLDER_HREF}>{t(`Footer.${key}`)}</a>
                </li>
              ))}
            </LinkList>
          </nav>
        </Columns>

        <Bottom>{t('Footer.copyright', { year })}</Bottom>
      </Container>
    </Wrapper>
  );
}
