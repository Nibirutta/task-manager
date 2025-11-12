import LoginForm from "../features/LoginForm/LoginForm";
import { useTranslation } from "react-i18next";
import usePageMetadata from "../hooks/usePageMetadata";

const LoginPage = () => {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("loginPage.meta.title"),
    description: t("loginPage.meta.description"),
    ogTitle: t("loginPage.meta.ogTitle"),
    ogDescription: t("loginPage.meta.ogDescription"),
  });

  return (
    <div className="w-full flex content-center justify-center py-60 ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
