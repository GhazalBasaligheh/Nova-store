import { Locale } from '@/types/enums/Locale';
import { env } from '@/utils/env';

const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const tomanFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 });

export function usdToToman(usd: number): number {
  return Math.round(usd * env.usdToTomanRate);
}

/**
 * Prices are stored in USD (the API's currency) and converted only for display.
 * fa: Toman at the DEMO-ONLY rate from env, Persian digits; en: USD.
 * `tomanLabel` comes from the dictionary so no UI text is hard-coded here.
 */
export function formatPrice(usd: number, locale: Locale, tomanLabel: string): string {
  if (locale === Locale.Fa) return `${tomanFormatter.format(usdToToman(usd))} ${tomanLabel}`;
  return usdFormatter.format(usd);
}
