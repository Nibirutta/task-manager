import z from "zod";
import style from "./Registerform.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useId, useMemo } from "react";
import { AtSign, CircleCheck, IdCard, Shield, ShieldCheck, Tag} from "lucide-react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { requestRegister } from "../../api/Task API/services/accountService";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const createRegisterSchema = (t: TFunction) => z.object({
    username: z
      .string({
        error: t("validation.username.required"),
      })
      .trim()
      .min(3, t("validation.username.min"))
      .max(30, t("validation.username.max"))
      .regex(/^[a-zA-Z0-9_-]+$/, t("validation.username.regex")),
  
    email: z.email(t("validation.email.invalid")),
  
    name: z
      .string({
        error: t("validation.name.required"),
      })
      .trim()
      .toLowerCase()
      .min(3, t("validation.name.min"))
      .max(30, t("validation.name.max"))
      .regex(/^[a-zA-Z]+$/, t("validation.name.regex")),
  
    password: z
      .string({ error: t("validation.password.required") })
      .min(8, t("validation.password.min"))
      .regex(/[a-z]/, t("validation.password.lowercase"))
      .regex(/[A-Z]/, t("validation.password.uppercase"))
      .regex(/[0-9]/, t("validation.password.number"))
      .regex(/[^a-zA-Z0-9]/, t("validation.password.specialChar")),
  
      confirmPassword: z
      .string({ error: t("validation.confirmPassword.required") })
  
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("validation.confirmPassword.match"),
    path: ["confirmPassword"],
  });


type RegisterformInputs = z.infer<ReturnType<typeof createRegisterSchema>>

function Registerform() {
      const { t } = useTranslation();
      const registerSchema = useMemo(() => createRegisterSchema(t), [t]);

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
      } = useForm<RegisterformInputs>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
        defaultValues: { // defaultValues não precisam de tradução
          username: "",
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        },
      });
      
    const nameID = useId();
    const usernameID = useId();
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();

    const navigate = useNavigate();
    

    const onSubmit = async (data: RegisterformInputs) => {
        try {
            await  toast.promise(
              requestRegister({ name: data.name, email: data.email, username: data.username, password: data.password }),
              
              {
                pending: t('registerForm.toast.pending'),
                success: t('registerForm.toast.success'),
                error: {
                  render({ data }: { data: Error }) {
                    return data.message || t('registerForm.toast.errorFallback');
                  },
                }                
              },

              {
                autoClose: 10000,
                onClose: () => navigate("/login")
              }
              
            )


        } catch (error) {
           console.error(error) 
        }
    };      

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={style.form} >

            <h2 className={style.title}>{t('registerForm.title')}</h2>
            

            <InputField 
              id={nameID}
              label={t('registerForm.firstNameLabel')}
              Icon={IdCard}
              type="text"
              placeholder={t('registerForm.firstNamePlaceholder')}
              isValid={!errors.name}
              errorMessage={errors.name?.message}
              {...register("name")}
              autoComplete="given-name"
            />

            <InputField 
              id={emailID}
              label={t('registerForm.emailLabel')}
              type="email"
              placeholder={t('registerForm.emailPlaceholder')}
              isValid={!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
              Icon={AtSign}
              autoComplete="email"
            />

            <InputField 
              id={usernameID}
              label={t('registerForm.usernameLabel')}
              type="text"
              placeholder={t('registerForm.usernamePlaceholder')}
              isValid={!errors.username}
              errorMessage={errors.username?.message}
              {...register("username")}
              Icon={Tag}
              autoComplete="username"
            />
            
            <InputField 
              id={passwordID}
              label={t('registerForm.passwordLabel')}
              type="password"
              placeholder={t('registerForm.passwordPlaceholder')}
              isValid={!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
              Icon={Shield}
              
            />


            <InputField
              id={confirmPasswordID}
              label={t('registerForm.confirmPasswordLabel')}
              type="password"
              placeholder={t('registerForm.confirmPasswordPlaceholder')}
              Icon={ShieldCheck}
              isValid={!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <SubmitBtn
              title={t('registerForm.submitButton')}
              icon={CircleCheck}
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
            />

            {errors.root && <p className={style.error}>{errors.root.message}</p>}

        </form>
    )
}


export default Registerform;
