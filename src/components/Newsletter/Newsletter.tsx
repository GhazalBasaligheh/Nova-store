'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import styled from 'styled-components';
import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import {
  newsletterSchema,
  type NewsletterErrorKey,
  type NewsletterValues,
} from '@/validations/newsletter';

const Section = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
`;

const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

const Heading = styled.h2`
  margin-block-end: ${({ theme }) => theme.spacing.xs};
  font-size: 24px;
`;

const Muted = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input<{ $invalid: boolean }>`
  flex: 1;
  min-height: 48px;
  padding-inline: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;

const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;

const SuccessText = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
`;

// No newsletter endpoint exists (FakeStoreAPI has none, and a backend is out of scope),
// so a valid submission only shows the success state. Nothing is sent or stored.
export function Newsletter() {
  const t = useTranslations('Newsletter');
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;

  const formik = useFormik<NewsletterValues>({
    initialValues: { email: '' },
    validationSchema: newsletterSchema,
    onSubmit: (_values, { resetForm, setStatus }) => {
      resetForm();
      setStatus('success');
    },
  });

  const error = formik.touched.email && formik.errors.email;
  const succeeded = formik.status === 'success';

  return (
    <Section aria-labelledby={`${id}-heading`}>
      <Container>
        <Panel>
          <div>
            <Heading id={`${id}-heading`}>{t('heading')}</Heading>
            <Muted>{t('body')}</Muted>
          </div>

          <Form noValidate onSubmit={formik.handleSubmit}>
            <Label htmlFor={emailId}>{t('emailLabel')}</Label>
            <Row>
              <Input
                id={emailId}
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
                placeholder={t('emailPlaceholder')}
                $invalid={Boolean(error)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                {...formik.getFieldProps('email')}
                onChange={(event) => {
                  formik.setStatus(undefined);
                  formik.handleChange(event);
                }}
              />
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? t('submitting') : t('submit')}
              </Button>
            </Row>
            {error && (
              <ErrorText id={errorId} role="alert">
                {t(`errors.${error as NewsletterErrorKey}`)}
              </ErrorText>
            )}
            <div aria-live="polite">{succeeded && <SuccessText>{t('success')}</SuccessText>}</div>
          </Form>
        </Panel>
      </Container>
    </Section>
  );
}
