import LoginForm from "../features/LoginForm/LoginForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("loginPage.meta.title");
  }, [t]);

  return (
    <div className="w-full flex content-center justify-center py-60 ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
