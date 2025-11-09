import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../lib/Reui/modal/modal";
import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../types/taskServiceTypes";
import style from "./TaskDetailsDialog.module.css";
import {
  Flag,
  CheckCircle,
  CircleDotDashed,
  Hourglass,
  XCircle,
  FilePenLine,
  FileX,
  Minimize2,
} from "lucide-react";
import type { ExpirationStatus } from "../../utils/getTaskStatus";
import { useTranslation } from "react-i18next";
import i18n from "../../layout/i18n";

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

function TaskDetailsDialog({
  isOpen,
  onOpenChange,
  onEditClick,
  onDeleteClick,
  task,
}: TaskDetailsDialogProps) {
  const { t } = useTranslation();

  const priorityDetails: Record<TaskPriority, { icon: React.ReactNode; className: string }> = {
    urgent: { icon: <Flag size={16} />, className: style.urgent },
    high: { icon: <Flag size={16} />, className: style.high },
    medium: { icon: <Flag size={16} />, className: style.medium },
    low: { icon: <Flag size={16} />, className: style.low },
    optional: { icon: <Flag size={16} />, className: style.optional },
  };

  const statusDetails: Record<TaskStatus, { icon: React.ReactNode; className: string }> = {
    "to-do": { icon: <Hourglass size={16} />, className: style.todo },
    "in-progress": { icon: <CircleDotDashed size={16} />, className: style.inprogress },
    "in-review": { icon: <XCircle size={16} />, className: style.inreview },
    "done": { icon: <CheckCircle size={16} />, className: style.done },
  };

  const expirationDetails: Record<ExpirationStatus, { icon: React.ReactNode; className: string }> = {
    "in-time": { icon: <CheckCircle size={16} />, className: style.intime },
    deadline: { icon: <XCircle size={16} />, className: style.deadline },
    expired: { icon: <XCircle size={16} />, className: style.expired },
  };

  if (!task) {
    return null;
  }

  const formattedDueDate = (task as ProcessedTask).formattedDueDate;
  const expirationStatus = (task as ProcessedTask).expirationStatus;

  const priorityInfo = priorityDetails[task.priority];
  const statusInfo = statusDetails[task.status];
  const expiration = expirationDetails[expirationStatus];

  // Usa o idioma atual do i18next para formatar a data
  const dateLocaleOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const taskCreatedDateFormatted = new Date(task.createdAt).toLocaleDateString(
    i18n.language,
    dateLocaleOptions
  );

  const taskUpdatedDateFormatted = new Date(task.updatedAt).toLocaleDateString(
    i18n.language,
    dateLocaleOptions
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader className="w-full flex flex-col items-center justify-center">
          <DialogTitle className={style.dialogTitle}>{task.title}</DialogTitle>
          <DialogDescription className={style.dialogSubtitle}>
            {t('detailsDialog.subtitle', { createdAt: taskCreatedDateFormatted, updatedAt: taskUpdatedDateFormatted })}
          </DialogDescription>
        </DialogHeader>

        <div className={style.badges}>
          <div className={style.detailItem}>
            <span className={style.detailLabel}>{t('detailsDialog.badges.status')}</span>
            <span className={`${style.detailValue} ${statusInfo.className}`}>
              {statusInfo.icon}
              {t(`taskForm.status.${task.status}`)}
            </span>
          </div>

          <div className={style.detailItem}>
            <span className={style.detailLabel}>{t('detailsDialog.badges.priority')}</span>
            <span className={`${style.detailValue} ${priorityInfo.className}`}>
              {priorityInfo.icon}
              {t(`taskForm.priority.${task.priority}`)}
            </span>
          </div>

          <div className={style.detailItem}>
            <span className={style.detailLabel}>{t(`detailsDialog.badges.${expirationStatus}`)}</span>
            <span className={` ${style.detailValue} ${expiration.className}`}>
              {expiration.icon}
              {formattedDueDate}
            </span>
          </div>
        </div>

        <div className={style.descriptionSection}>
          <h3 className={style.detailLabel}>{t('detailsDialog.descriptionLabel')}</h3>
          {task.description ? (
            <p className={style.descriptionText}>{task.description}</p>
          ) : (
            <p className={style.descriptionText}>
              {t('detailsDialog.noDescription')}
            </p>
          )}
        </div>

        <DialogFooter className={style.dialogFooter}>
          <button
            title={t('detailsDialog.footer.editLabel')}
            aria-label={t('detailsDialog.footer.editLabel')}
            onClick={() => onEditClick(task)}
          >
            <span>{t('detailsDialog.footer.edit')}</span>
            <FilePenLine size={16} />
          </button>

          <button
            title={t('detailsDialog.footer.deleteLabel')}
            aria-label={t('detailsDialog.footer.deleteLabel')}
            onClick={() => onDeleteClick(task)}
          >
            <span>{t('detailsDialog.footer.delete')}</span>
            <FileX size={16} />
          </button>

          <button
            title={t('detailsDialog.footer.closeLabel')}
            aria-label={t('detailsDialog.footer.closeLabel')}
            onClick={() => onOpenChange(false)}
          >
            <span>{t('detailsDialog.footer.close')}</span>
            <Minimize2 size={16} />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
