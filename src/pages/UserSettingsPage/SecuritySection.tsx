import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

import { requestCredential } from "../../api/Task API/services/authService"; 
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { Lock, Mail, Shield, ShieldCheck } from "lucide-react";

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
      await requestCredential({
        password: data.newPassword,
      });

      toast.success("Senha alterada com sucesso!");
      resetPasswordForm();
    } catch (error) {
      toast.error("Falha ao alterar a senha. Verifique sua senha atual.");
      console.error(error);
    }
  };

  const onEmailChange = async (data: EmailFormData) => {
    try {
      await requestCredential({ email: data.email });
      toast.success("E-mail alterado com sucesso!");
      resetEmailForm();
    } catch (error) {
      toast.error("Falha ao alterar o e-mail. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <section className="space-y-12">
      {/* Seção de Alteração de Senha */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Alterar Senha</h3>
          <p className="text-sm text-muted-foreground">
            Para sua segurança, recomendamos uma senha forte.
          </p>
        </div>
        <form
          onSubmit={handlePasswordSubmit(onPasswordChange)}
          className="space-y-4 max-w-md"
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
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Alterar E-mail</h3>
          <p className="text-sm text-muted-foreground">
            Altere o e-mail associado à sua conta.
          </p>
        </div>
        <form
          onSubmit={handleEmailSubmit(onEmailChange)}
          className="space-y-4 max-w-md"
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
