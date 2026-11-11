'use client';

import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@/assets/Icons';
import { useCategoryLabel } from '@/shared/hooks/useCategoryLabel';
import { Link } from '@/i18n/navigation';
import { KNOWN_CATEGORIES } from '@/utils/categoryLabels';
import { QueryParam } from '@/types/enums/QueryParam';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { Details } from './CategoryMenu.styles';

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
