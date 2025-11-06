import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Shield, ShieldCheck } from "lucide-react";

import InputField from "../components/InputField/InputField";
import SubmitBtn from "../components/SubmitBtn/SubmitBtn";
import { requestNewPassword } from "../api/Task API/services/accountService";
import Spinner from "../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

// Schema de validação para o formulário
const createResetPasswordSchema = (t: TFunction) => z
  .object({
    password: z
      .string({ error: t("validation.password.required") })
      .min(8, t("validation.password.min"))
      .regex(/[a-z]/, t("validation.password.lowercase"))
      .regex(/[A-Z]/, t("validation.password.uppercase"))
      .regex(/[0-9]/, t("validation.password.number"))
      .regex(
        /[^a-zA-Z0-9]/,
        t("validation.password.specialChar")
      ),

    confirmPassword: z.string({
      error: t("validation.confirmPassword.required"),
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("validation.confirmPassword.match"),
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<ReturnType<typeof createResetPasswordSchema>>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [token, setToken] = useState<string | null>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const resetPasswordSchema = useMemo(() => createResetPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    document.title = t("resetPasswordPage.meta.title");
    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      toast.error(t("resetPasswordPage.toast.invalidLink"));
      // navigate("/login");
    } else {
      setToken(tokenFromUrl);
    }
    setIsValidatingToken(false);
  }, [navigate, searchParams, t]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    const promise = requestNewPassword({ password: data.password }, token);

    toast.promise(promise, {
      pending: t("resetPasswordPage.toast.pending"),
      success: t("resetPasswordPage.toast.success"),
      error: t("resetPasswordPage.toast.error"),
    });

    try {
      await promise;
      navigate("/login");
    } catch (error) {
      console.error("Falha ao redefinir a senha:", error);
    }
  };

  if (isValidatingToken) {
    return <Spinner size={55} color="#0d1b2a" text={t("resetPasswordPage.spinner.validating")} />;
  }

  return (
    <section className="flex flex-col items-center justify-center h-dvh w-full bg-[var(--reset-page-bg)] p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4 sm:p-16 flex flex-col items-center justify-center gap-8 bg-[var(--reset-form-bg)] rounded-2xl border-4 border-[var(--reset-form-border)] shadow-[var(--reset-form-shadow)]"
      >
        <h2 className="text-3xl font-bold font-(family-name:--reset-form-title-font) text-[var(--reset-form-title-color)] ">
          {t("resetPasswordPage.form.title")}
        </h2>
        <InputField
          id="password"
          label={t("resetPasswordPage.form.passwordLabel")}
          type="password"
          Icon={Shield}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <InputField
          id="confirmPassword"
          label={t("resetPasswordPage.form.confirmPasswordLabel")}
          type="password"
          Icon={ShieldCheck}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <SubmitBtn
          title={t("resetPasswordPage.form.submitButton")}
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </section>
  );
};

export default ResetPasswordPage;
