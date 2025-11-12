import RegisterForm from '../features/RegisterForm/RegisterForm';
import { useTranslation } from 'react-i18next';
import usePageMetadata from '../hooks/usePageMetadata';

const RegisterPage = () => {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("registerPage.meta.title"),
    description: t("registerPage.meta.description"),
    ogTitle: t("registerPage.meta.ogTitle"),
    ogDescription: t("registerPage.meta.ogDescription"),
  });

  return (
    <div className="w-full py-64 flex justify-center content-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
