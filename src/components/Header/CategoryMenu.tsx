'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { ChevronDownIcon } from '@/assets/Icons';
import { useCategoryLabel } from '@/components/ProductSection/useCategoryLabel';
import { Link } from '@/i18n/navigation';
import { KNOWN_CATEGORIES } from '@/utils/categoryLabels';
import { QueryParam } from '@/types/enums/QueryParam';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';

// Native <details> disclosure: keyboard- and screen-reader-friendly with no extra JS.
const Details = styled.details`
  position: relative;

  summary {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-weight: 500;
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    background: rgb(255 255 255 / 10%);
  }

  &[open] summary svg {
    rotate: 180deg;
  }

  ul {
    display: grid;
    padding-inline-start: ${({ theme }) => theme.spacing.md};
    list-style: none;
  }

  ${({ theme }) => theme.media.desktop} {
    ul {
      position: absolute;
      inset-inline-start: 0;
      top: calc(100% + 4px);
      min-width: 200px;
      padding: ${({ theme }) => theme.spacing.xs};
      border-radius: ${({ theme }) => theme.radius.md};
      background: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.text};
      box-shadow: ${({ theme }) => theme.shadow.card};
    }

    ul a:hover {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  }
`;

interface CategoryMenuProps {
  onNavigate: () => void;
}

// Header category menu. Uses the known API slugs so it can render in the layout without a request;
// the chips on the home page use the live category list.
export function CategoryMenu({ onNavigate }: CategoryMenuProps) {
  const t = useTranslations('Categories');
  const label = useCategoryLabel();

  const close = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest('details')?.removeAttribute('open');
    onNavigate();
  };

  return (
    <Details>
      <summary>
        {t('menu')}
        <ChevronDownIcon size={16} />
      </summary>
      <ul>
        {KNOWN_CATEGORIES.map((slug) => (
          <li key={slug}>
            <Link
              href={{
                pathname: routes.home,
                query: { [QueryParam.Category]: slug },
                hash: PRODUCTS_ANCHOR,
              }}
              onClick={close}
            >
              {label(slug)}
            </Link>
          </li>
        ))}
      </ul>
    </Details>
  );
}
