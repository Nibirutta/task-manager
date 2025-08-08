import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Send, CircleUser } from "lucide-react";
import style from "./LoginForm.module.css";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import idGenerator from "../../utils/idGenerator";
import sendLogin from "../../api/taskAPI/login";

const loginSchema = z.object({
	username: z
		.string({
			error: "O nome de usuário é obrigatório.",
		})
		.trim()
		.min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
		.max(30, "O nome de usuário não pode ter mais de 30 caracteres.")
		.regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e underscore (_)."),
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
    formState: { errors, isSubmitting, isValid: isFormValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const token = await sendLogin(data);
    console.log(token);

    /* criar uma função que reseta o form */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h2 className={style.title}>Login</h2>

      <InputField
        id={idGenerator()}
        label="Username"
        placeholder="Seu nome de usuário"
        Icon={CircleUser}
        {...register("username")}
        isValid={!errors.username}
        errorMessage={errors.username?.message}
      />

      <InputField
        id={idGenerator()}
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
        disabled={!isFormValid || isSubmitting}
      />

      <div className={style.redirect}>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <span>Não tem uma conta</span>
        </a>

        <a href="http://" target="_blank" rel="noopener noreferrer">
          <span>Esqueceu sua senha?</span>
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
