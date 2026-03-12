import { MetadataRoute } from 'next';

const locales = ['tr', 'en', 'de', 'es'] as const;
const defaultLocale = 'tr';
const baseUrl = 'https://innerhunt.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const hreflang = {
        tr: baseUrl,
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        es: `${baseUrl}/es`,
        'x-default': baseUrl,
    };

    const privacyHreflang = {
        tr: `${baseUrl}/privacy`,
        en: `${baseUrl}/en/privacy`,
        de: `${baseUrl}/de/privacy`,
        es: `${baseUrl}/es/privacy`,
        'x-default': `${baseUrl}/privacy`,
    };

    return [
        // Main page
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
            alternates: { languages: hreflang },
        },
        ...locales.filter(l => l !== defaultLocale).map((locale) => ({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
            alternates: { languages: hreflang },
        })),
        // Privacy page
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
            alternates: { languages: privacyHreflang },
        },
        ...locales.filter(l => l !== defaultLocale).map((locale) => ({
            url: `${baseUrl}/${locale}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
            alternates: { languages: privacyHreflang },
        })),
    ];
}

