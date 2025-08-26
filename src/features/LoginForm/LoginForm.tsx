import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Send, CircleUser } from "lucide-react";
import style from "./LoginForm.module.css";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import useAuth from "../../hooks/useAuth";
import type { ILoginData } from "../../types/TaskApiTypes";





const loginSchema = z.object({
	username: z
		.string({
			error: "O nome de usuário é obrigatório.",
		})
		.trim()
		.min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
		.max(30, "O nome de usuário não pode ter mais de 30 caracteres.")
		.regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e underline (_)."),
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
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const { login } = useAuth();
  const usernameId = useId();
  const passwordId = useId();

  const onSubmit = async (data: ILoginData) => {
    try {
      await login(data)
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "Ocorreu um erro no login. Tente novamente.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h2 className={style.title}>Login</h2>

      {errors.root && <p className={style.formError}>{errors.root.message}</p>}

      <InputField
        id={usernameId}
        label="Username"
        placeholder="Seu nome de usuário"
        Icon={CircleUser}
        {...register("username")}
        isValid={!errors.username}
        errorMessage={errors.username?.message}
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
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <span>Não tenho uma conta</span>
        </a>

        <a href="http://" target="_blank" rel="noopener noreferrer">
          <span>Esqueceu sua senha?</span>
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
