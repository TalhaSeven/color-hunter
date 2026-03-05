import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-4">
      <div style={{ fontSize: 48 }}>🔍</div>
      <p
        style={{
          color: "var(--color-text-dim)",
          fontSize: 14,
        }}
      >
        {t("notFound")}
      </p>
      <a
        href="/"
        style={{
          color: "var(--color-gold)",
          fontSize: 14,
          textDecoration: "underline",
          textUnderlineOffset: 4,
        }}
      >
        {t("restartLink")}
      </a>
    </div>
  );
}
