import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Shield, ShieldCheck } from "lucide-react";

import InputField from "../components/InputField/InputField";
import SubmitBtn from "../components/SubmitBtn/SubmitBtn";
import { requestNewPassword } from "../api/Task API/services/authService";
import Spinner from "../components/Spinner/Spinner";

// Schema de validação para o formulário
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z.string(),
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
      navigate("/login");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 flex flex-col items-center justify-center w-full max-w-md gap-8 bg-white rounded-2xl border-4 border-gray-200 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800">Redefinir Senha</h2>
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
    </div>
  );
};

export default ResetPasswordPage;