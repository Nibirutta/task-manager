import z from "zod";
import style from "./Registerform.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useId } from "react";
import { AtSign, CircleCheck, IdCard, Shield, ShieldCheck, Tag, UserRound } from "lucide-react";
import requestRegister from "../../api/Task API/services/registerService";
import { toast } from "react-toastify";

const registerSchema = z.object({
  username: z
    .string({
      error: "O nome de usuário é obrigatório.",
    })
    .trim()
    .min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
    .max(30, "O nome de usuário não pode ter mais de 30 caracteres.")
    .regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e underline (_)."),

  email: z.email(),

  firstname: z
    .string({
      error: "O primeiro nome é obrigatório.",
    })
    .trim()
    .toLowerCase()
    .min(3, "O primeiro nome deve ter no mínimo 3 caracteres.")
    .max(30, "O primeiro nome não pode ter mais de 30 caracteres.")
    .regex(/^[a-zA-Z]+$/, "Use apenas letras."),

  lastname: z
    .string()
    .trim()
    .toLowerCase()
    .max(30, "O último nome não pode ter mais de 30 caracteres.")
    // *como o lastname é opicional, ele então deve aceitar string vazia, por isso não tem min, e tem * no regex
    .regex(/^[a-zA-Z]*$/, "Use apenas letras.").optional(),

  password: z
    .string({ error: "A senha é obrigatória." })
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula.")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
    .regex(/[0-9]/, "A senha deve conter ao menos um número.")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter ao menos um caractere especial."),

    confirmPassword: z
    .string({ error: "A confirmação de senha é obrigatória." })

})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas precisam ser iguais.",
  path: ["confirmPassword"],
});


type RegisterformInputs = z.infer<typeof registerSchema>

function Registerform() {
    
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
      } = useForm<RegisterformInputs>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
        defaultValues: {
          username: "",
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: "",
        },
      });

    const firstNameID = useId();
    const lastNameID = useId();
    const usernameID = useId();
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();
    

    const onSubmit = async (data: RegisterformInputs) => {
        try {
            await  toast.promise(
              requestRegister(data),
              {
                pending: "Criando sua conta...",
                success: "Conta criada com sucesso! Redirecionando para o login...",
                error: {
                  render({ data }: { data: Error }) {
                    return data.message;
                  },
                },
              },
              {
                autoClose: false,
              }
            )
        } catch (error) {
           console.error(error) 
        }
    };      

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={style.form} >

            <h2 className={style.title}>Registre-se</h2>
            
            


            <InputField 
              id={firstNameID}
              label="Primeiro Nome"
              Icon={IdCard}
              type="text"
              placeholder="Digite seu primeiro nome"
              isValid={!errors.firstname}
              errorMessage={errors.firstname?.message}
              {...register("firstname")}
            />

            <InputField 
              id={lastNameID}
              label="Último Nome"
              Icon={UserRound}
              type="text"
              placeholder="Digite seu último nome"
              isValid={!errors.lastname}
              errorMessage={errors.lastname?.message}
              {...register("lastname")}
            />
            
            <InputField 
              id={emailID}
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              isValid={!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
              Icon={AtSign}
            />

            <InputField 
              id={usernameID}
              label="Nome de Usuário"
              type="text"
              placeholder="Digite seu nome de usuário"
              isValid={!errors.username}
              errorMessage={errors.username?.message}
              {...register("username")}
              Icon={Tag}
            />
            
            <InputField 
              id={passwordID}
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              isValid={!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
              Icon={Shield}
            />


            <InputField
              id={confirmPasswordID}
              label="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
              Icon={ShieldCheck}
              isValid={!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <SubmitBtn
              title="Criar Conta"
              icon={CircleCheck}
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
            />

            {errors.root && <p className={style.error}>{errors.root.message}</p>}

        </form>
    )
}


export default Registerform;
