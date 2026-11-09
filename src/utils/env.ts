// Typed access to public env vars. NEXT_PUBLIC_* must be read with literal property names
// so Next.js can inline them into client bundles.

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing environment variable ${name}. See .env.example.`);
  return value;
}

function positiveNumber(name: string, value: string | undefined): number {
  const parsed = Number(required(name, value));
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Environment variable ${name} must be a positive number.`);
  }
  return parsed;
}

export const env = {
  apiBaseUrl: required('NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL),
  siteUrl: required('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL),
  // DEMO ONLY: fixed display rate, not a live exchange rate.
  usdToTomanRate: positiveNumber(
    'NEXT_PUBLIC_USD_TO_TOMAN_RATE',
    process.env.NEXT_PUBLIC_USD_TO_TOMAN_RATE,
  ),
} as const;
