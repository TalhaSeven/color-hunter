import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-4">
      <div className="text-5xl">🔍</div>
      <p className="text-text-dim text-sm">
        {t("notFound")}
      </p>
      <Link
        href="/"
        className="text-gold text-sm underline underline-offset-4"
      >
        {t("restartLink")}
      </Link>
    </div>
  );
}
