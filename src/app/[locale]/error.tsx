'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { AlertIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { StatePanel } from '@/shared/StatePanel';

const Main = styled.main`
  padding-block: ${({ theme }) => theme.spacing.xxl};
`;

// Error boundary for every page in a locale: an unexpected rendering error shows this
// inside the normal layout instead of a blank page. `retry` re-renders the failed part.
export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  const t = useTranslations('ErrorPage');

  return (
    <Main>
      <Container>
        <StatePanel
          tone="danger"
          icon={<AlertIcon size={32} />}
          title={t('title')}
          description={t('body')}
          action={
            <Button type="button" onClick={() => retry()}>
              {t('retry')}
            </Button>
          }
        />
      </Container>
    </Main>
  );
}
