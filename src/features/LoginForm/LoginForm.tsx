import { useId, useMemo } from "react";
import { useForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Lock, Send, CircleUser } from "lucide-react";
import style from "./LoginForm.module.css";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "../ForgotPasswordForm/ForgotPasswordDialog";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";




// Função que cria o schema de validação com as mensagens traduzidas
const createLoginSchema = (t: TFunction) => z.object({
  username: z
    .string({
      error: t("validation.username.required"),
    })
    .trim()
    .min(3, t("validation.username.min"))
    .max(30, t("validation.username.max"))
    .regex(/^[a-zA-Z0-9_-]+$/, t("validation.username.regex")),
  password: z
    .string({ error: t("validation.password.required") })
    .min(8, t("validation.password.min"))
    .regex(/[a-z]/, t("validation.password.lowercase"))
    .regex(/[A-Z]/, t("validation.password.uppercase"))
    .regex(/[0-9]/, t("validation.password.number"))
    .regex(/[^a-zA-Z0-9]/, t("validation.password.specialChar")),
});

type LoginFormInputs = z.infer<ReturnType<typeof createLoginSchema>>;


function LoginForm() {
  const { t } = useTranslation();
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({ 
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  } as UseFormProps<LoginFormInputs>); // Cast para evitar problemas de tipo com o schema dinâmico

  const { login } = useAuth();
  const usernameId = useId();
  const passwordId = useId();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    
    try {
      await toast.promise(
        login(data),
        {
          pending: t('loginPage.toast.pending'),
          success: t('loginPage.toast.success'),
          error: t('loginPage.toast.error')
        },
      );
      navigate("/dashboard");
      console.log('navegando pra dashboard')
    } catch (error) {
      console.error("Falha no fluxo de login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h2 className={style.title}>{t('loginPage.form.title')}</h2>

      <InputField
        id={usernameId}
        label={t('loginPage.form.usernameLabel')}
        placeholder={t('loginPage.form.usernamePlaceholder')}
        Icon={CircleUser}
        {...register("username")}
        isValid={!errors.username}
        errorMessage={errors.username?.message}
        autoComplete="username"
      />

      <InputField
        id={passwordId}
        label={t('loginPage.form.passwordLabel')}
        type="password"
        placeholder={t('loginPage.form.passwordPlaceholder')}
        Icon={Lock}
        {...register("password")}
        isValid={!errors.password}
        errorMessage={errors.password?.message}
      />

      <SubmitBtn
        title={t('loginPage.form.submitButton')}
        icon={Send}
        isLoading={isSubmitting}
        disabled={!isValid || isSubmitting}
      />

      <div className={style.redirect}>
        <Link to="/register">
          <span>{t('loginPage.form.noAccount')}</span>
        </Link>

        <ForgotPasswordDialog />
      </div>
    </form>
  );
}

export default LoginForm;
