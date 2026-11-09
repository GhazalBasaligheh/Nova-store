import { object, string, type InferType } from 'yup';

// Messages are dictionary keys (under Newsletter.errors), translated in the component,
// so the schema stays locale-independent.
export const NewsletterError = {
  Required: 'required',
  Invalid: 'invalid',
} as const;

export type NewsletterErrorKey = (typeof NewsletterError)[keyof typeof NewsletterError];

export const newsletterSchema = object({
  email: string()
    .trim()
    .required(NewsletterError.Required)
    .email(NewsletterError.Invalid)
    .max(254, NewsletterError.Invalid),
});

export type NewsletterValues = InferType<typeof newsletterSchema>;
