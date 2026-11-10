import { object, string, type InferType } from 'yup';
import { NewsletterError } from '@/types/enums/NewsletterError';

// Messages are dictionary keys (under Newsletter.errors), translated in the component,
// so the schema stays locale-independent.

export const newsletterSchema = object({
  email: string()
    .trim()
    .required(NewsletterError.Required)
    .email(NewsletterError.Invalid)
    .max(254, NewsletterError.Invalid),
});

export type NewsletterValues = InferType<typeof newsletterSchema>;
