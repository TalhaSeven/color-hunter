import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['tr', 'en', 'de', 'es'],
    defaultLocale: 'tr',
    localePrefix: 'as-needed',
});

export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
