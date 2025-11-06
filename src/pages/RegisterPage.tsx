import RegisterForm from '../features/RegisterForm/RegisterForm';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("registerPage.meta.title");
  }, [t]);

  return (
    <div className="w-full py-64 flex justify-center content-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
