import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['tr', 'en', 'de', 'es'],
    defaultLocale: 'tr',
    localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
