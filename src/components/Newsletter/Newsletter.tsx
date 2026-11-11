'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import type { NewsletterError } from '@/types/enums/NewsletterError';
import { newsletterSchema, type NewsletterValues } from '@/validations/newsletter';
import {
  Section,
  Panel,
  Heading,
  Muted,
  Form,
  Row,
  Label,
  Input,
  ErrorText,
  SuccessText,
} from './Newsletter.styles';

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
                {t(`errors.${error as NewsletterError}`)}
              </ErrorText>
            )}
            <div aria-live="polite">{succeeded && <SuccessText>{t('success')}</SuccessText>}</div>
          </Form>
        </Panel>
      </Container>
    </Section>
  );
}
