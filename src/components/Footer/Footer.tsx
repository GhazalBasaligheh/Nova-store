'use client';

import { useTranslations } from 'next-intl';
import { BagIcon } from '@/assets/Icons';
import { Container } from '@/shared/Container';
import { Wrapper, Columns, Brand, Muted, Heading, LinkList, Bottom } from './Footer.styles';

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
