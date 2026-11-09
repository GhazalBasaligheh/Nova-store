'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styled from 'styled-components';
import { BagIcon, CartIcon, CloseIcon, MenuIcon } from '@/assets/Icons';
import { Link } from '@/i18n/navigation';
import { CountBadge } from '@/shared/Badge';
import { IconButton } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { PRODUCTS_ANCHOR, routes } from '@/utils/routes';
import { CategoryMenu } from './CategoryMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchForm } from './SearchForm';
import { ThemeToggle } from './ThemeToggle';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.onHeader};
`;

// Mobile: [logo | actions] then full-width search. Desktop: logo, nav, search, actions in one row.
const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'logo actions'
    'search search'
    'nav nav';
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: auto auto 1fr auto;
    grid-template-areas: 'logo nav search actions';
    gap: ${({ theme }) => theme.spacing.lg};
    padding-block: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  grid-area: logo;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.04em;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
  grid-area: nav;
  display: ${({ $open }) => ($open ? 'block' : 'none')};

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  a {
    display: block;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-weight: 500;
  }

  a:hover {
    background: rgb(255 255 255 / 10%);
  }

  ${({ theme }) => theme.media.desktop} {
    display: block;

    ul {
      flex-direction: row;
      gap: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const SearchArea = styled.div`
  grid-area: search;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const CartLink = styled(Link)`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover {
    background: rgb(255 255 255 / 10%);
  }
`;

const MenuButton = styled(IconButton)`
  ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`;

interface HeaderProps {
  // Cart count is wired to the Zustand store in the cart step.
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
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
              {cartCount > 0 && <CountBadge aria-hidden="true">{cartCount}</CountBadge>}
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
