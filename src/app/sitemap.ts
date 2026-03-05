import { MetadataRoute } from 'next';

const locales = ['tr', 'en', 'de', 'es'] as const;
const defaultLocale = 'tr';
const baseUrl = 'https://colorhunter.app';

export default function sitemap(): MetadataRoute.Sitemap {
    // Color Hunter is a single-page app conceptually, so we just return the root URL for all locales
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
            alternates: {
                languages: {
                    tr: baseUrl,
                    en: `${baseUrl}/en`,
                    de: `${baseUrl}/de`,
                    es: `${baseUrl}/es`,
                    'x-default': baseUrl, // Fallback for unmatched languages
                },
            },
        },
        ...locales.filter(l => l !== defaultLocale).map((locale) => ({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
            alternates: {
                languages: {
                    tr: baseUrl,
                    en: `${baseUrl}/en`,
                    de: `${baseUrl}/de`,
                    es: `${baseUrl}/es`,
                    'x-default': baseUrl,
                },
            },
        })),
    ];
}
