import { useId } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./ResetPasswordForm.module.css";

import { toast } from "react-toastify";
import InputField from "../../components/InputField/InputField";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { CheckCheckIcon, Lock, ShieldCheck } from "lucide-react";
import { requestNewPassword } from "../../api/Task API/services/accountService";
import type { ResetPasswordRequestTypes } from "../../types/AccountServiceTypes";

const resetPasswordSchema = z
  .object({
    password: z
      .string({ error: "A senha é obrigatória." })
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(
        /[^a-zA-Z0-9]/,
        "A senha deve conter ao menos um caractere especial."
      ),

    confirmPassword: z.string({
      error: "A confirmação de senha é obrigatória.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const passwordId = useId();
  const confirmPasswordId = useId();

  if (!token) {
    return (
      <div className={style.invalidToken}>
        <h2>Link Inválido</h2>
        <p>
          O link para redefinição de senha é inválido ou expirou. Por favor,
          solicite um novo.
        </p>
        <SubmitBtn title="Ir para o Login" onClick={() => navigate("/login")} />
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordRequestTypes) => {
    try {
      await toast.promise(requestNewPassword(data, token), {
        pending: "Atualizando sua senha...",
        success: "Senha atualizada com sucesso! Redirecionando para o login.",
        error: {
          render({ data }) {
            if (data instanceof Error) {
              return data.message || "Ocorreu um erro. Tente novamente.";
            }
            return "Link inválido ou expirado. Por favor, solicite um novo.";
          },
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Falha ao redefinir a senha:", error);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.title}>Redefinir Senha</h2>
      <InputField
        id={passwordId}
        label="Nova Senha"
        type="password"
        placeholder="Digite sua nova senha"
        Icon={Lock}
        isValid={!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <InputField
        id={confirmPasswordId}
        label="Confirme a Nova Senha"
        type="password"
        placeholder="Digite sua nova senha novamente"
        Icon={ShieldCheck}
        isValid={!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <SubmitBtn
        title="Atualizar Senha"
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        icon={CheckCheckIcon}
      />
    </form>
  );
}

export default ResetPasswordForm;
