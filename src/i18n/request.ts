import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

const locales = ['tr', 'en', 'de', 'es'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(locales, requested) ? requested : 'tr';

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
        timeZone: 'Europe/Istanbul',
        onError(error) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[next-intl]', error.message);
            }
        },
        getMessageFallback({ namespace, key }) {
            return `${namespace}.${key}`;
        },
    };
});
