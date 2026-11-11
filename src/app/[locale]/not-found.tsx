'use client';

import { useTranslations } from 'next-intl';
import { SearchIcon } from '@/assets/Icons';
import { Container } from '@/shared/ui/Container';
import { StatePanel } from '@/shared/ui/StatePanel';
import { routes } from '@/utils/routes';
import { Main, HomeLink } from './not-found.styles';

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
