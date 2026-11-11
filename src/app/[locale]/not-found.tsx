'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { SearchIcon } from '@/assets/Icons';
import { Link } from '@/i18n/navigation';
import { Container } from '@/shared/Container';
import { StatePanel } from '@/shared/StatePanel';
import { routes } from '@/utils/routes';

const Main = styled.main`
  padding-block: ${({ theme }) => theme.spacing.xxl};
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
`;

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Main>
      <Container>
        <StatePanel
          icon={<SearchIcon size={32} />}
          title={t('title')}
          description={t('body')}
          action={<HomeLink href={routes.home}>{t('back')}</HomeLink>}
        />
      </Container>
    </Main>
  );
}
