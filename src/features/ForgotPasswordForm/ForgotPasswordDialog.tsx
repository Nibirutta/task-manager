import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Mail, Send } from "lucide-react";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../lib/Reui/modal/modal";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { requestReset } from "../../api/Task API/services/passwordResetService";
import style from "./ForgotPasswordDialog.module.css";

const forgotPasswordSchema = z.object({
  email: z.email({ error: "Por favor, insira um e-mail válido." })
})

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const emailId = useId();

  const onSubmit = async (data: ForgotPasswordInputs) => {
    try {
      await toast.promise(requestReset(data.email), {
        pending: "Verificando seu e-mail...",
        success: "Se uma conta com este e-mail existir, um link de recuperação foi enviado.",
        error: "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      });
      reset(); 
      setOpen(false);
    } catch (error) {
      console.error("Falha ao solicitar reset de senha:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className={style.triggerLink}>Esqueceu sua senha?</span>
      </DialogTrigger>
      <DialogContent className={style.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <DialogHeader className={style.header}>
            <DialogTitle className={style.title}>Redefinir Senha</DialogTitle>
            <DialogDescription className={style.description}>
              Insira seu e-mail abaixo. Se ele estiver cadastrado, enviaremos um
              link para você criar uma nova senha.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className={style.body}>
            <InputField
              id={emailId}
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              Icon={Mail}
              {...register("email")}
              isValid={!errors.email}
              errorMessage={errors.email?.message}
            />
          </DialogBody>
          <DialogFooter className={style.footer}>
            <SubmitBtn
              title="Enviar Link"
              icon={Send}
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
