import { useTranslations } from "next-intl";
import TestForm from "@/components/test-form";

export default function Page(): JSX.Element {
  const t = useTranslations("Index");

  return (
    <main>
      <p>{t("title")}</p>
      <TestForm />
    </main>
  );
}
