import { useId } from "react";
import { useForm } from "react-hook-form";
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




const loginSchema = z.object({
	username: z
		.string({
			error: "O nome de usuário é obrigatório.",
		})
		.trim()
		.min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
		.max(30, "O nome de usuário não pode ter mais de 30 caracteres.")
		.regex(/^[a-zA-Z0-9_-]+$/, "Use apenas letras, números e underline '_' ou hífen'-'."),
	password: z
		.string({ error: "A senha é obrigatória." })
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula.")
		.regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
		.regex(/[0-9]/, "A senha deve conter ao menos um número.")
		.regex(/[^a-zA-Z0-9]/, "A senha deve conter ao menos um caractere especial."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;


function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const { login } = useAuth();
  const usernameId = useId();
  const passwordId = useId();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    
    try {
      await toast.promise(
        login(data),
        {
          pending: 'Verificando credenciais...',
          success: 'Login realizado com sucesso! Redirecionando...',
          error: 'Usuário ou senha inválidos. Tente novamente.'
        },

        {
          onClose: () => navigate("/dashboard")
        }
      );
    } catch (error) {
      console.error("Falha no fluxo de login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h2 className={style.title}>Login</h2>

      <InputField
        id={usernameId}
        label="Username"
        placeholder="Seu nome de usuário"
        Icon={CircleUser}
        {...register("username")}
        isValid={!errors.username}
        errorMessage={errors.username?.message}
        autoComplete="username"
      />

      <InputField
        id={passwordId}
        label="Senha"
        type="password"
        placeholder="••••••••"
        Icon={Lock}
        {...register("password")}
        isValid={!errors.password}
        errorMessage={errors.password?.message}
      />

      <SubmitBtn
        title="Entrar"
        icon={Send}
        isLoading={isSubmitting}
        disabled={!isValid || isSubmitting}
      />

      <div className={style.redirect}>
        <Link to="/register">
          <span>Não tenho uma conta</span>
        </Link>

        <ForgotPasswordDialog />
      </div>
    </form>
  );
}

export default LoginForm;
