'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useId, type FormEvent } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '@/assets/Icons';
import { getPathname, useRouter } from '@/i18n/navigation';
import { routes } from '@/utils/routes';

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md} 48px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;

const Submit = styled.button`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  display: grid;
  place-items: center;
  width: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
`;

const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

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
    router.push({ pathname: routes.home, query: q ? { q } : {} });
  };

  return (
    <Form
      role="search"
      action={getPathname({ href: routes.home, locale })}
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
