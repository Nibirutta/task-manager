import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Mail, Send } from "lucide-react";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../lib/Reui/modal/modal";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";

import style from "./ForgotPasswordDialog.module.css";
import { requestPasswordResetEmail } from "../../api/Task API/services/accountService";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const createForgotPasswordSchema = (t: TFunction) => z.object({
  email: z.email({ message: t("validation.email.invalid") })
});

type ForgotPasswordInputs = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

function ForgotPasswordDialog() {
  const { t } = useTranslation();
  const forgotPasswordSchema = useMemo(() => createForgotPasswordSchema(t), [t]);

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const emailId = useId();

  const onSubmit = async (data: ForgotPasswordInputs) => {
    try {
      await toast.promise(requestPasswordResetEmail(data), {
        pending: t('forgotPassword.toast.pending'),
        success: t('forgotPassword.toast.success'),
        error: t('forgotPassword.toast.error'),
      });
      reset(); 
      setOpen(false);
    } catch (error) {
      console.error("Falha ao solicitar reset de senha:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className={style.triggerLink}>{t('loginPage.form.forgotPassword')}</span>
      </DialogTrigger>
      <DialogContent className={style.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <DialogHeader className={style.header}>
            <DialogTitle className={style.title}>{t('forgotPassword.title')}</DialogTitle>
            <DialogDescription className={style.description}>
              {t('forgotPassword.description')}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className={style.body}>
            <InputField
              id={emailId}
              label={t('registerForm.emailLabel')}
              type="email"
              placeholder={t('registerForm.emailPlaceholder')}
              Icon={Mail}
              {...register("email")}
              isValid={!errors.email}
              errorMessage={errors.email?.message}
            />
          </DialogBody>
          <DialogFooter className={style.footer}>
            <SubmitBtn
              title={t('forgotPassword.submitButton')}
              icon={Send}
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
