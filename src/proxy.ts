import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// Next.js 16 "proxy" (formerly middleware): locale detection and prefix handling.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and files with an extension (robots.txt, sitemap.xml, images).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
