import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';
import { NextRequest, NextResponse } from 'next/server';

export const routing = defineRouting({
    locales: ['tr', 'en', 'de', 'es'],
    defaultLocale: 'tr',
    localePrefix: 'as-needed',
});

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/privacy') {
        const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

        if (
            localeCookie &&
            localeCookie !== 'tr' &&
            routing.locales.includes(localeCookie as (typeof routing.locales)[number])
        ) {
            const url = request.nextUrl.clone();
            url.pathname = `/${localeCookie}/privacy`;
            return NextResponse.redirect(url);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
