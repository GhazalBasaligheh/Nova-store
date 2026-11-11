'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { BagIcon, CartIcon, CloseIcon, MenuIcon } from '@/assets/Icons';
import { Link } from '@/i18n/navigation';
import { CountBadge } from '@/shared/ui/Badge';
import { selectItemCount, useCartStore } from '@/storage/cartStore';
import { useCartHydrated } from '@/storage/useCartHydration';
import { Container } from '@/shared/ui/Container';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { CategoryMenu } from './CategoryMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchForm } from './SearchForm';
import { ThemeToggle } from './ThemeToggle';
import { Bar, Layout, Logo, Nav, SearchArea, Actions, CartLink, MenuButton } from './Header.styles';

export function Header() {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const format = useFormatter();
  const hydrated = useCartHydrated();
  const storedCount = useCartStore(selectItemCount);
  // Server and first client render show no count; the persisted value appears after hydration.
  const cartCount = hydrated ? storedCount : 0;
  const closeMenu = () => setMenuOpen(false);

  return (
    <Bar>
      <Container>
        <Layout>
          <Logo href={routes.home} aria-label={t('Brand.homeLink')}>
            <BagIcon size={26} />
            <span>{t('Brand.name')}</span>
          </Logo>

          <Nav id="main-nav" aria-label={t('Header.mainNav')} $open={menuOpen}>
            <ul>
              <li>
                <Link href={routes.home} onClick={closeMenu}>
                  {t('Header.home')}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: routes.home, hash: PRODUCTS_ANCHOR }} onClick={closeMenu}>
                  {t('Header.products')}
                </Link>
              </li>
              <li>
                <CategoryMenu onNavigate={closeMenu} />
              </li>
              <li>
                <Link href={routes.cart} onClick={closeMenu}>
                  {t('Header.cart')}
                </Link>
              </li>
            </ul>
          </Nav>

          <SearchArea>
            <SearchForm />
          </SearchArea>

          <Actions>
            <LanguageSwitcher />
            <ThemeToggle />
            <CartLink
              href={routes.cart}
              aria-label={t('Header.cartWithCount', { count: cartCount })}
            >
              <CartIcon size={22} />
              {cartCount > 0 && (
                <CountBadge aria-hidden="true">{format.number(cartCount)}</CountBadge>
              )}
            </CartLink>
            <MenuButton
              type="button"
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              aria-label={menuOpen ? t('Header.closeMenu') : t('Header.openMenu')}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </MenuButton>
          </Actions>
        </Layout>
      </Container>
    </Bar>
  );
}
