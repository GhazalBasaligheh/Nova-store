'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { GlobeIcon } from '@/assets/Icons';
import { Link, usePathname } from '@/i18n/navigation';
import { Locale } from '@/types/enums/Locale';

const SwitchLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

// Two locales, so a single link to the other one; keeps the current path and query (filters, page).
export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const target = locale === Locale.Fa ? Locale.En : Locale.Fa;

  return (
    <SwitchLink
      href={{ pathname, query: Object.fromEntries(searchParams.entries()) }}
      locale={target}
      hrefLang={target}
      aria-label={t('Header.switchLanguage')}
    >
      <GlobeIcon />
      <span lang={target}>{t(`Languages.${target}`)}</span>
    </SwitchLink>
  );
}
