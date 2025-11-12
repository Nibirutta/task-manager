import { useEffect, useId, useMemo } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { CaseSensitive } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { requestUpdateAccount } from "../../api/Task API/services/accountService";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const createProfileSchema = (t: TFunction) => z.object({
  name: z
    .string()
    .trim()
    .min(3, t("validation.name.min"))
    .max(30, t("validation.name.max")),
});

type ProfileFormInputs = z.infer<ReturnType<typeof createProfileSchema>>;

function ProfileSection() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const nameId = useId();
  const profileSchema = useMemo(() => createProfileSchema(t), [t]);
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
      const response = await toast.promise(
        requestUpdateAccount({ name: data.name,
         }),
        {
          pending: t("userSettingsPage.profileSection.toast.pending"),
          success: t("userSettingsPage.profileSection.toast.success"),
          error: t("userSettingsPage.profileSection.toast.error"),
        }
      );
      updateUser(response.profile);
      reset({ name: response.profile.name });
    } catch (error) {
      console.error("Falha ao atualizar o nome:", error);

    }
  };

  return (
    <section className="py-28 mx-auto w-full flex flex-col items-center justify-center gap-8 border-b-mercury-300 border-b-4">
      <div className="flex justify-center items-center flex-col p-6">
        <h3 className="text-5xl font-(family-name:--profile-title-font) text-[var(--profile-title-color)]  text-shadow-[var(--profile-title-shadow)] font-medium">
          {t("userSettingsPage.profileSection.title", { name: user?.name })}
        </h3>
        <p className="text-2xl font-normal mt-12 text-[var(--profile-subtitle-color)] font-(family-name:--profile-subtitle-font)">
          {t("userSettingsPage.profileSection.subtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 flex flex-col items-center justify-center w-[280px] lg:w-[400px] gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]"
      >
        <InputField
          id={nameId}
          label={t("userSettingsPage.profileSection.form.nameLabel")}
          Icon={CaseSensitive}
          type="text"
          autoComplete="off"
          
          placeholder={t("userSettingsPage.profileSection.form.namePlaceholder")}
          {...register("name")}
          isValid={!errors.name}
          errorMessage={errors.name?.message}
        />

        <SubmitBtn title={t("userSettingsPage.profileSection.form.submitButton")} isLoading={isSubmitting} disabled={!isDirty || !isValid || isSubmitting} />
      </form>
    </section>
  );
}

export default ProfileSection;