import { useTranslation } from "react-i18next";
import usePageMetadata from "../hooks/usePageMetadata";


const NotFoundPage = () => {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("notFoundPage.meta.title"),
    description: t("notFoundPage.meta.description"),
    ogTitle: t("notFoundPage.meta.ogTitle"),
    ogDescription: t("notFoundPage.meta.ogDescription"),
  });

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">{t("notFoundPage.title")}</h1>
    </div>
  );
};

export default NotFoundPage;