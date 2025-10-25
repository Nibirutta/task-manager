import { useEffect, useId } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { CaseSensitive } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";
import { requestUpdateProfileName } from "../../api/Task API/services/profileService";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(30, "O nome não pode ter mais de 30 caracteres."),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

function ProfileSection() {
  const { user, updateUser } = useAuth();
  const nameId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const updatedUserInfo = await toast.promise(
        requestUpdateProfileName({ name: data.name }),
        {
          pending: "Atualizando seu nome...",
          success: "Nome atualizado com sucesso!",
          error: "Não foi possível atualizar o nome. Tente novamente.",
        }
      );
      updateUser(updatedUserInfo);
      reset({ name: updatedUserInfo.name });
    } catch (error) {
      console.error("Falha ao atualizar o nome:", error);

    }
  };

  return (
    <section className="py-28 mx-auto w-full flex flex-col items-center justify-center gap-8">
      <div>
        <h3 className="text-5xl font-(family-name:--profile-title-font) text-[var(--profile-title-color)]  text-shadow-[var(--profile-title-shadow)] font-medium">
          Perfil Público de {user?.name}
        </h3>
        <p className="text-2xl font-normal mt-12 text-[var(--profile-subtitle-color)] font-(family-name:--profile-subtitle-font)">
          Estas informações podem ser visíveis para outros usuários.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 flex flex-col items-center justify-center w-[400px] gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]"
      >
        <InputField
          id={nameId}
          label="Nome de Exibição"
          Icon={CaseSensitive}
          type="text"
          placeholder="Digite seu novo nome de exibição"
          {...register("name")}
          isValid={!errors.name}
          errorMessage={errors.name?.message}
        />

        <SubmitBtn title="Alterar" isLoading={isSubmitting} disabled={!isDirty || !isValid || isSubmitting} />
      </form>
    </section>
  );
}

export default ProfileSection;