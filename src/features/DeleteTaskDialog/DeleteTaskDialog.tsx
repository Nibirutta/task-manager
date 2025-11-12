import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../lib/Reui/modal/modal';
import type { TaskType } from '../../types/taskServiceTypes';
import style from './DeleteTaskDialog.module.css';
import { useTranslation } from 'react-i18next';

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: TaskType | null;
  onConfirm: (task: TaskType) => void;
}

function DeleteTaskDialog({ isOpen, onOpenChange, task, onConfirm }: DeleteTaskDialogProps) {
  const { t } = useTranslation();

  if (!task) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(task);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader className={style.dialogHeader}>
          <DialogTitle className={style.dialogTitle}>{t('deleteDialog.title')}</DialogTitle>
          <DialogDescription className={style.dialogDescription}>
            {t('deleteDialog.description', { title: task.title })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={style.dialogFooter}>
          <DialogClose asChild>
            <button type="button" className={style.cancelButton}>{t('deleteDialog.cancelButton')}</button>
          </DialogClose>
          <button onClick={handleConfirm} className={style.confirmButton}>{t('deleteDialog.confirmButton')}</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTaskDialog;