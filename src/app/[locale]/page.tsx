import { setRequestLocale } from "next-intl/server";
import ColorHunterApp from "@/components/ColorHunterApp";

const locales = ["tr", "en", "de", "es"] as const;

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ColorHunterApp />;
}
