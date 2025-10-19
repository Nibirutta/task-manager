import { useState, useEffect, type FormEvent } from "react";

import { toast } from "react-toastify";

import { CaseSensitive } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { requestUpdateProfileName } from "../../api/Task API/services/profileService";
import InputField from "../../components/InputField/InputField";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";


 function ProfileSection() {
  const { user, updateUser } = useAuth(); 
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const hasNameChanged = user?.name !== name;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!hasNameChanged || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const originalName = user?.name;

    try {
      const updatedUserInfo = await requestUpdateProfileName({ name });
      
      updateUser(updatedUserInfo); // atualiza o estado global 
      toast.success("Nome atualizado com sucesso!");
    } catch (error) {
      console.error("Falha ao atualizar o nome:", error);
      toast.error("Não foi possível atualizar o nome. Tente novamente.");

      if (originalName) {
        setName(originalName);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 mx-auto w-dvw flex flex-col items-center justify-center gap-8">
      <div>
        <h3 className="text-6xl font-(family-name:--profile-title-font) text-[var(--profile-title-color)]  text-shadow-[var(--profile-title-shadow)] font-medium">Perfil Público de {user?.name}</h3>
        <p className="text-4xl font-normal mt-12 text-[var(--profile-subtitle-color)] font-(family-name:--profile-subtitle-font)">
          Estas informações podem ser visíveis para outros usuários.
        </p>
      </div>

      <form onSubmit={handleSubmit} className=" p-12 flex flex-col items-center  justify-center gap-8 bg-[var(--login-bg-color)] rounded-2xl border-4 border-[var(--login-border-color)] shadow-[var(--login-shadow-color)]">

        <InputField
            id="1"
            label="Nome de Exibição Atual, Alterar?"
            Icon={CaseSensitive}
            type="text"
            placeholder="Digite seu nome de exibição"
            value={user?.name}
        />

        <SubmitBtn
            title="Alterar"
        />
      </form>
    </section>
  );
}

export default ProfileSection;