import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../lib/Reui/modal/modal';
import type { ITask } from '../../types/taskTypes';
import style from './DeleteTaskDialog.module.css';

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: ITask | null;
  onConfirm: (task: ITask) => void;
}

function DeleteTaskDialog({ isOpen, onOpenChange, task, onConfirm }: DeleteTaskDialogProps) {
  if (!task) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(task);
    onOpenChange(false); // Fecha o modal após a confirmação
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir a tarefa "{task.title}"? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className={style.cancelButton}>Cancelar</button>
          </DialogClose>
          <button onClick={handleConfirm} className={style.confirmButton}>Excluir</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTaskDialog;