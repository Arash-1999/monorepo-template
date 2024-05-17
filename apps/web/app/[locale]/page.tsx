import { useTranslations } from "next-intl";

export default function Page(): JSX.Element {
  const t = useTranslations("Index");

  return (
    <main>
      <p>{t("title")}</p>
    </main>
  );
}
