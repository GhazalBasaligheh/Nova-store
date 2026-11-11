'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { GlobeIcon } from '@/assets/Icons';
import { usePathname } from '@/i18n/navigation';
import { Locale } from '@/types/enums/Locale';
import { SwitchLink } from './LanguageSwitcher.styles';

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
