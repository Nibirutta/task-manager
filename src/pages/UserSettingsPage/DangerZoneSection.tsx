import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../lib/Reui/modal/modal";
import InputField from "../../components/InputField/InputField"; 
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn"; 
import { ShieldAlert } from "lucide-react";

export function DangerZoneSection() {
  const { deleteAccount, user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isConfirmationMatching = confirmationInput === user?.name;

  const handleDeleteAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isConfirmationMatching) return;

    setIsDeleting(true);
    await toast.promise(deleteAccount(), {
      pending: "Deletando sua conta...",
      success: "Sua conta foi deletada com sucesso. Você será deslogado.",
      error: "Ocorreu um erro ao deletar sua conta. Tente novamente.",
    });

  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmationInput("");
    }
        setIsModalOpen(open);
  };

  return (
    <section className="py-12 px-4  flex flex-col items-center justify-center gap-8 bg-[var(--danger-zone-bg-color)] border-4 border-[var(--danger-zone-border-color)] w-full shadow-[var(--danger-zone-shadow)]">
      <div className="text-center flex flex-col gap-8 justify-center items-center">
        <h3 className="text-3xl font-bold text-[var(--danger-zone-title-color)] font-(family-name:--danger-zone-title-font) text-shadow-[var(--danger-zone-title-shadow)]
         ">Zona de Perigo</h3>
        <p className="text-xl text-[var(--danger-zone-subtitle-color)] font-(family-name:--danger-zone-subtitle-font) ">
          As ações nesta seção são permanentes e não podem ser desfeitas.
        </p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <button
            className="text-xl p-6  flex items-center justify-center cursor-pointer bg-[var(--danger-zone-btn-bg-color)] hover:bg-[var(--danger-zone-btn-bg-hover)] focus:bg-[var(--danger-zone-btn-bg-hover)] active:bg-[var(-delete-acc-btn-bg-active)] border-[var(--danger-zone-btn-border-color)] border-2 hover:border-[var(--danger-zone-btn-border-hover)] focus:border-[var(--danger-zone-btn-border-hover)] active:border-[var(--danger-zone-btn-border-active)] shadow-[var(--danger-zone-btn-shadow)] hover:shadow-[var(--danger-zone-btn-shadow-hover)] focus:shadow-[var(--danger-zone-btn-shadow-hover)] active:shadow-[var(--danger-zone-btn-shadow-active)] text-[var(--danger-zone-btn-text-color)] hover:text-[var(--danger-zone-btn-text-hover)] focus:text-[var(--danger-zone-btn-text-hover)] active:text-[var(--danger-zone-btn-text-active)] font-(family-name:--delete-acc-btn-text-font)
             "
          >
            <ShieldAlert size={24} />
            Deletar Minha Conta
          </button>
        </DialogTrigger>
        <DialogContent className=" w-[300px] p-12 bg-[var(--delete-dialog-bg)] border-[var(--delete-dialog-border-color)] rounded-xl shadow-[var(--delete-dialog-shadow)]">
          <DialogHeader className=" rounded-2xl flex flex-col items-center justify-center w-full p-4  bg-[var(--delete-dialog-header-bg)]">
            <DialogTitle className=" text-3xl font-bold text-[var(    --delete-dialog-title-color)] font-(family-name:--delete-dialog-title-font)">
              Você tem certeza absoluta?
            </DialogTitle>
            <DialogDescription className="text-xl  text-[var(--delete-dialog-description-color)] font-(family-name:--delete-dialog-description-font)">
              Esta ação não pode ser desfeita. Isso excluirá permanentemente
              sua conta e removerá todos os seus dados de nossos servidores.
            </DialogDescription>
          </DialogHeader>          
          <form id="delete-account-form" onSubmit={handleDeleteAccount}>
            <div className="py-4">
              <InputField
                id="delete-confirm"
                label={`Por favor, digite "${user?.name}" para confirmar.`}
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                autoComplete="off"
                isValid={true}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button type="button" className="px-4 cursor-pointer py-2 rounded bg-[var(--delete-dialog-cancel-btn-bg)] hover:bg-[var(--delete-dialog-cancel-btn-bg-hover)] focus:bg-[var(--delete-dialog-cancel-btn-bg-hover)] text-xl text-[var(--delete-dialog-cancel-btn-text)] hover:text-[var(--delete-dialog-cancel-btn-text-hover)] focus:text-[var(--delete-dialog-cancel-btn-text-hover)] font-(family-name:--delete-dialog-cancel-btn-text-font) border-[var(--delete-dialog-cancel-btn-border)] border-2" disabled={isDeleting}>
                  Cancelar
                </button>
              </DialogClose>
              <SubmitBtn
                type="submit"
                title=" deletar minha conta"
                disabled={!isConfirmationMatching || isDeleting}

                isLoading={isDeleting}
                className=" cursor-pointer rounded text-xl px-4 py-2 bg-[var(--danger-zone-btn-bg-color)] hover:bg-[var(--danger-zone-btn-bg-hover)] focus:bg-[var(--danger-zone-btn-bg-hover)] active:bg-[var(-delete-acc-btn-bg-active)] border-[var(--danger-zone-btn-border-color)] border-2 hover:border-[var(--danger-zone-btn-border-hover)] focus:border-[var(--danger-zone-btn-border-hover)] active:border-[var(--danger-zone-btn-border-active)] shadow-[var(--danger-zone-btn-shadow)] hover:shadow-[var(--danger-zone-btn-shadow-hover)] focus:shadow-[var(--danger-zone-btn-shadow-hover)] active:shadow-[var(--danger-zone-btn-shadow-active)] text-[var(--danger-zone-btn-text-color)] hover:text-[var(--danger-zone-btn-text-hover)] focus:text-[var(--danger-zone-btn-text-hover)] active:text-[var(--danger-zone-btn-text-active)] font-(family-name:--delete-acc-btn-text-font)"
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}