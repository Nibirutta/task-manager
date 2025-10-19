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
import InputField from "../../components/InputField/InputField"; // Usando seu InputField
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn"; // Usando seu SubmitBtn
import { ShieldAlert } from "lucide-react";

export function DangerZoneSection() {
  const { deleteAccount, user } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isConfirmationMatching = confirmationInput === user?.name;

  const handleDeleteAccount = async () => {
    if (!isConfirmationMatching) return;

    setIsDeleting(true);
    try {
      await deleteAccount();
      toast.success("Sua conta foi deletada com sucesso.");
      // O AuthContext já lida com o logout e o redirecionamento.
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar sua conta. Tente novamente.");
      console.error("Falha ao deletar a conta:", error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmationInput("");
    }
    setIsModalOpen(open);
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-red-500">Zona de Perigo</h3>
        <p className="text-md text-gray-400 mt-2">
          As ações nesta seção são permanentes e não podem ser desfeitas.
        </p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <SubmitBtn
            title="Deletar Conta"
            icon={ShieldAlert}
            className="bg-red-600 hover:bg-red-700 border-red-800"
          />
        </DialogTrigger>
        <DialogContent className="bg-[var(--login-bg-color)] border-[var(--login-border-color)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--fpd-title-color)]">
              Você tem certeza absoluta?
            </DialogTitle>
            <DialogDescription className="text-[var(--fpd-description-color)]">
              Esta ação não pode ser desfeita. Isso excluirá permanentemente
              sua conta e removerá todos os seus dados de nossos servidores.
            </DialogDescription>
          </DialogHeader>
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
              <button className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600" disabled={isDeleting}>
                Cancelar
              </button>
            </DialogClose>
            <SubmitBtn
              title={isDeleting ? "Deletando..." : "Eu entendo, deletar minha conta"}
              onClick={handleDeleteAccount}
              disabled={!isConfirmationMatching || isDeleting}
              isLoading={isDeleting}
              className="bg-red-600 hover:bg-red-700 border-red-800"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}