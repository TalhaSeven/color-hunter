import { getTranslations, setRequestLocale } from "next-intl/server";

const locales = ["tr", "en", "de", "es"] as const;

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy" });
  const sectionKeys = [
    "dataCollection",
    "localStorage",
    "analytics",
    "notifications",
    "thirdParty",
    "children",
    "changes",
    "contact",
  ] as const;

  const sections = sectionKeys.map((key) => ({
    key,
    title: t(`${key}.title`),
    content: t(`${key}.content`),
  }));

  return (
    <main
      className="min-h-dvh px-6 py-16 md:px-12 lg:px-24 max-w-3xl mx-auto"
      aria-label={t("title")}
    >
      <header className="mb-12">
        <p className="screen-label mb-4">{t("label")}</p>
        <h1 className="screen-title text-left mb-4">{t("title")}</h1>
        <p className="text-text-dim text-sm">
          {t("lastUpdated")}: {t("updatedAt")}
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.key}>
            <h2 className="font-cinzel text-lg text-gold-light mb-3 font-semibold">
              {section.title}
            </h2>
            <p className="text-text-dim leading-relaxed text-[15px]">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-white/5">
        <a
          href={locale === "tr" ? "/" : `/${locale}`}
          className="text-gold text-sm hover:text-gold-light transition-colors"
        >
          ← {t("backHome")}
        </a>
      </footer>
    </main>
  );
}
