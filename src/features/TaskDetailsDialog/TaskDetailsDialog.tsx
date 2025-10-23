import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../lib/Reui/modal/modal';
import type {  TaskPriority, TaskStatus, TaskType } from '../../types/taskServiceTypes';
import style from './TaskDetailsDialog.module.css';
import { Flag, CheckCircle, CircleDotDashed, Hourglass, XCircle, FilePenLine, FileX, Minimize2 } from 'lucide-react';
import type { ExpirationStatus } from '../../utils/getTaskStatus';

type ProcessedTask = TaskType & {
  formattedDueDate: string;
  expirationStatus: ExpirationStatus;
};
interface TaskDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
  task: TaskType | null;
}


const priorityDetails: Record<TaskPriority, { label: string; icon: React.ReactNode; className: string }> = {
  urgent: { label: 'Urgente', icon: <Flag size={16} />, className: style.urgent },
  high: { label: 'Alta', icon: <Flag size={16} />, className: style.high },
  medium: { label: 'Média', icon: <Flag size={16} />, className: style.medium },
  low: { label: 'Baixa', icon: <Flag size={16} />, className: style.low },
  optional: { label: 'Opcional', icon: <Flag size={16} />, className: style.optional },
};

const statusDetails: Record<TaskStatus, { label: string; icon: React.ReactNode; className: string }> = {
  'to-do': { label: 'Pendente', icon: <Hourglass size={16} />, className: style.todo },

  'in-progress': { label: 'Em Progresso', icon: <CircleDotDashed size={16} />, className: style.inprogress },

  'in-review': { label: 'Em Revisão', icon: <XCircle size={16} />, className: style.inreview },

  'done': { label: 'Concluído', icon: <CheckCircle size={16} />, className: style.done },
};


function TaskDetailsDialog({ isOpen, onOpenChange, onEditClick, onDeleteClick, task }: TaskDetailsDialogProps) {

  if (!task) {
    return null;
  }

  const priority = priorityDetails[task.priority];
  const status = statusDetails[task.status];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>{task.title}</DialogTitle>
          <DialogDescription className={style.dialogDescription}>
            
          </DialogDescription>
        </DialogHeader>

        <div className={style.detailsGrid}>

          <div className={style.detailItem}>
            <span className={style.detailLabel}>Status</span>
            <span className={`${style.detailValue} ${status.className}`}>
              {status.icon}
              {status.label}
            </span>
          </div>

          <div className={style.detailItem}>
            <span className={style.detailLabel}>Prioridade</span>
            <span className={`${style.detailValue} ${priority.className}`}>
              {priority.icon}
              {priority.label}
            </span>
          </div>

          <div className={style.detailItem}>
            <span className={style.detailLabel}>Data de Vencimento</span>
            <span className={style.detailValue}>{(task as ProcessedTask).formattedDueDate || 'Sem data'}</span>
          </div>

        </div>

        <div className={style.descriptionSection}>
          <h3 className={style.detailLabel}>Descrição</h3>
          {task.description ? (
            <p className={style.descriptionText}>
              {task.description}
            </p>
          ): (
            <p className={style.descriptionText}>
              Nenhuma descrição no momento.
            </p>
          )}
          </div>

          <DialogFooter className={style.dialogFooter}>

            <button  aria-label='Editar tarefa' onClick={() => onEditClick(task)}>
              <FilePenLine size={16} />
            </button>

            <button aria-label='Deletar tarefa' onClick={() => onDeleteClick(task)}>
              <FileX size={16} />
            </button>

            <button aria-label='Fechar' onClick={() => onOpenChange(false)}>
            < Minimize2 size={16} />
            </button>
            
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
