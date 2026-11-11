'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useId, type FormEvent } from 'react';
import { SearchIcon } from '@/assets/Icons';
import { getPathname, useRouter } from '@/i18n/navigation';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { scrollToProducts } from '@/utils/scrollToProducts';
import { Form, Input, Submit, VisuallyHidden } from './SearchForm.styles';

// Submits to the home page's ?q= param, which drives the product list.
// Works without JavaScript via the form action; with JS it navigates client-side.
export function SearchForm() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    // The hash scrolls to the results after navigating from another page;
    // scrollToProducts covers a search made while already on the home page.
    const search = q ? `?${new URLSearchParams({ q })}` : '';
    router.push(`${routes.home}${search}#${PRODUCTS_ANCHOR}`);
    scrollToProducts();
  };

  return (
    <Form
      role="search"
      action={`${getPathname({ href: routes.home, locale })}#${PRODUCTS_ANCHOR}`}
      method="get"
      onSubmit={handleSubmit}
    >
      <VisuallyHidden htmlFor={inputId}>{t('searchLabel')}</VisuallyHidden>
      <Input
        id={inputId}
        type="search"
        name="q"
        placeholder={t('searchPlaceholder')}
        defaultValue={searchParams.get('q') ?? ''}
        key={searchParams.get('q') ?? ''}
        enterKeyHint="search"
      />
      <Submit type="submit" aria-label={t('searchSubmit')}>
        <SearchIcon />
      </Submit>
    </Form>
  );
}
