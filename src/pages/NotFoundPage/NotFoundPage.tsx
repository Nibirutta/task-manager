import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import usePageMetadata from "../../hooks/usePageMetadata";
import UndrawImage from '../../assets/svg/undraw_page-not-found_6wni.svg?react';

const NotFoundPage = () => {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("notFoundPage.meta.title"),
    description: t("notFoundPage.meta.description"),
    ogTitle: t("notFoundPage.meta.ogTitle"),
    ogDescription: t("notFoundPage.meta.ogDescription"),
  });
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-200px)] p-4 text-center">
      <div className="grid items-center gap-8 md:grid-cols-2 max-w-5xl">
        {/* Imagem */}
        <UndrawImage className="w-full max-w-md mx-auto" />
        
        {/* Conteúdo de Texto */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[var(--hero-title-color)]">
            {t("notFoundPage.title")}
          </h1>
          <p className="text-lg text-[var(--hero-subtitle-color)] max-w-md">
            {t("notFoundPage.subtitle")}
          </p>
          <Link
            to="/"
            className="mt-4 px-6 py-2 font-semibold text-[var(--sb-text-color)] bg-[var(--sb-bg-color)] rounded-md hover:bg-[var(--sb-hover-bg-color)] transition-colors duration-200"
          >
            {t("notFoundPage.button")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;