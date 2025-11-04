import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

import { requestUpdateAccount } from "../../api/Task API/services/accountService"; 
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { Lock, Mail, Shield, ShieldCheck } from "lucide-react";
import useAuth from "../../hooks/useAuth";

// Schema de validação para o formulário de senha
const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "A senha atual é obrigatória."),
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"], // O erro aparecerá no campo de confirmação
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const emailSchema = z.object({
  email: z.email("Formato de e-mail inválido."),
});

type EmailFormData = z.infer<typeof emailSchema>;

export function SecuritySection() {
  const { updateUser } = useAuth();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
    reset: resetEmailForm,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onPasswordChange = async (data: PasswordFormData) => {
    try {
      const response = await toast.promise(
        requestUpdateAccount({ password: data.newPassword,
         }),
        {
        pending: "Alterando sua senha...",
        success: "Senha alterada com sucesso!",
        error: "Falha ao alterar a senha. Verifique sua senha atual.",
        }
      );
      updateUser(response.profile);
      resetPasswordForm();
    } catch (error) {
      console.error("Falha ao alterar a senha:", error);
    }
  };

  const onEmailChange = async (data: EmailFormData) => {
    try {
      const response = await toast.promise(requestUpdateAccount( {
        email: data.email,}), {
        pending: "Alterando seu e-mail...",
        success: "E-mail alterado com sucesso! O estado global foi atualizado.",
        error: "Falha ao alterar o e-mail. Tente novamente.",
      });
      updateUser(response.profile);
      resetEmailForm();
    } catch (error) {
      console.error("Falha ao alterar o e-mail:", error);
    }
  };

  return (
    <section className="py-28 mx-auto w-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col justify-between items-center p-2 gap-8">
          <h3 className="text-4xl font-bold font-(family-name:--security-title-color) text-[var(--security-title-color)] text-shadow-[var(--security-title-shadow)]">Alterar Senha</h3>
          <p className="text-2xl font-medium font-(family-name:--security-subtitle-color) text-[var(--security-subtitle-color)]">
            Para sua segurança, recomendamos uma senha forte.
          </p>
        </div>
        <form
          onSubmit={handlePasswordSubmit(onPasswordChange)}
          className="p-8 flex flex-col items-center justify-center w-[400px] gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]"
        >
          <InputField
            id="currentPassword"
            label="Senha Atual"
            type="password"
            Icon={Lock}
            errorMessage={passwordErrors.currentPassword?.message}
            isValid={!passwordErrors.currentPassword}
            {...registerPassword("currentPassword")}
          />
          <InputField
            id="newPassword"
            label="Nova Senha"
            type="password"
            Icon={Shield}
            errorMessage={passwordErrors.newPassword?.message}
            isValid={!passwordErrors.newPassword}
            {...registerPassword("newPassword")}
          />
          <InputField
            id="confirmPassword"
            label="Confirmar Nova Senha"
            type="password"
            Icon={ShieldCheck}
            errorMessage={passwordErrors.confirmPassword?.message}
            isValid={!passwordErrors.confirmPassword}
            {...registerPassword("confirmPassword")}
          />
          <SubmitBtn title="Alterar Senha" isLoading={isPasswordSubmitting} />
        </form>
      </div>

      {/* Seção de Alteração de E-mail */}
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col justify-between items-center p-2 gap-8">
          <h3 className="text-4xl font-bold font-(family-name:--security-title-color) text-[var(--security-title-color)] text-shadow-[var(--security-title-shadow)]">Alterar E-mail</h3>
          <p className="text-2xl font-medium font-(family-name:--security-subtitle-color) text-[var(--security-subtitle-color)]">
            Altere o e-mail associado à sua conta.
          </p>
        </div>
        <form
          onSubmit={handleEmailSubmit(onEmailChange)}
          className="p-8 flex flex-col items-center justify-center w-[400px] gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]"
        >
          <InputField
            id="email"
            label="Novo E-mail"
            type="email"
            Icon={Mail}
            errorMessage={emailErrors.email?.message}
            isValid={!emailErrors.email}
            {...registerEmail("email")}
          />
          <SubmitBtn title="Alterar E-mail" isLoading={isEmailSubmitting} />
        </form>
      </div>
    </section>
  );
}
