import { useEffect, useState } from "react";
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




// Schema de validação para o formulário
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
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    document.title = "Task Manager | Redefinir Senha";
    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      toast.error("Link de redefinição inválido ou expirado.");
      // navigate("/login");
    } else {
      setToken(tokenFromUrl);
    }
    setIsValidatingToken(false);
  }, [navigate, searchParams]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    const promise = requestNewPassword({ password: data.password }, token);

    toast.promise(promise, {
      pending: "Redefinindo sua senha...",
      success: "Senha redefinida com sucesso! Você já pode fazer o login.",
      error: "O link é inválido ou expirou. Por favor, solicite um novo.",
    });

    try {
      await promise;
      navigate("/login");
    } catch (error) {
      console.error("Falha ao redefinir a senha:", error);
    }
  };

  if (isValidatingToken) {
    return <Spinner size={55} color="#0d1b2a" text="Validando link..." />;
  }

  return (
    <section className="flex flex-col items-center justify-center h-dvh w-full bg-[var(--reset-page-bg)] p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4 sm:p-16 flex flex-col items-center justify-center gap-8 bg-[var(--reset-form-bg)] rounded-2xl border-4 border-[var(--reset-form-border)] shadow-[var(--reset-form-shadow)]"
      >
        <h2 className="text-3xl font-bold font-(family-name:--reset-form-title-font) text-[var(--reset-form-title-color)] ">
          Redefinir Senha
        </h2>
        <InputField
          id="password"
          label="Digite a Nova Senha"
          type="password"
          Icon={Shield}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <InputField
          id="confirmPassword"
          label="Confirme a Nova Senha"
          type="password"
          Icon={ShieldCheck}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <SubmitBtn
          title="Confirmar Mudança"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </section>
  );
};

export default ResetPasswordPage;
