import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // SWC transform: stable class names (SSR/hydration match) and readable displayNames in dev.
  compiler: { styledComponents: true },
  cacheComponents: true,
  partialPrefetching: true,
};

export default withNextIntl(nextConfig);
