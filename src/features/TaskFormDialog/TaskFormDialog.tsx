import  { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../lib/Reui/modal/modal';
import type {   TaskPriority, TaskStatus, TaskType } from '../../types/taskServiceTypes';
import { Input } from '../../lib/Reui/input/input';
import { Textarea } from '../../lib/Reui/textArea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../lib/Reui/select/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/Reui/popover/popover';
import { Calendar } from '../../lib/Reui/calendar/calendar';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import style from './TaskFormDialog.module.css';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';


interface TaskFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  taskToEdit: TaskType | null; // Se for null, é um formulário de criação
  initialStatus?: TaskStatus; // Status inicial ao criar uma nova tarefa
  onSubmit: (data: TaskFormValues, id?: string) => void;
}

// Função para criar o schema dinamicamente
const createTaskFormSchema = (t: TFunction, isEditing: boolean) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera o tempo para comparar apenas a data

  return z.object({
    title: z.string().min(3, { message: t('taskForm.validation.titleMin') }).trim(),
    description: z.string().optional(),
    // Validação da data: não pode ser no passado.
    dueDate: isEditing
      ? z.date().min(today, { message: t('taskForm.validation.dateMin') }).optional()
      : z.date({ error: t('taskForm.validation.dateRequired') })
          .min(today, { message: t('taskForm.validation.dateMin') }),
    priority: z.enum(['low', 'medium', 'high', 'urgent', 'optional']),
    status: z.enum(['to-do', 'in-progress', 'in-review', 'done']),
  });
};


type TaskFormValues = z.infer<ReturnType<typeof createTaskFormSchema>>; 

function TaskFormDialog({ isOpen, onOpenChange, taskToEdit, initialStatus, onSubmit }: TaskFormDialogProps) {
  const { t, i18n } = useTranslation();
  const isEditing = taskToEdit !== null;

  const taskFormSchema = useMemo(() => createTaskFormSchema(t, isEditing), [t, isEditing]);

  const priorityOptions = useMemo(() => (Object.keys(t('taskForm.priority', { returnObjects: true })) as TaskPriority[]).map(key => ({
    value: key,
    label: t(`taskForm.priority.${key}`)
  })), [t]);

  const statusOptions = useMemo(() => (Object.keys(t('taskForm.status', { returnObjects: true })) as TaskStatus[]).map(key => ({
    value: key,
    label: t(`taskForm.status.${key}`)
  })), [t]);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema), 
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(), // Define a data atual como padrão para novas tarefas
      priority: 'medium',
      status: initialStatus || 'to-do',
    },
  });

  useEffect(() => {
    if (isEditing) {
      form.reset({
        title: taskToEdit.title,
        description: taskToEdit.description ?? '',
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : undefined,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
      });
    } else {
      // Reseta para os valores padrão de criação
      form.reset({
        title: '',
        description: '',
        dueDate: new Date(), // Garante que o reset para criação também use a data atual
        priority: 'medium',
        status: initialStatus || 'to-do',
      });
    } 
  }, [taskToEdit, initialStatus, form, isEditing]);

  const handleFormSubmit = (data: TaskFormValues) => {
    if (isEditing) {

      onSubmit(data, taskToEdit!.id);
    } else {

      onSubmit(data);
    }
  };

  const dateLocale = i18n.language === 'pt-BR' ? ptBR : enUS;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className= {style.dialogContent}>
        <DialogHeader className={style.dialogHeader}>
          <DialogTitle className={style.dialogTitle}>{isEditing ? t('taskForm.editTitle') : t('taskForm.createTitle')}</DialogTitle>

          <DialogDescription className={style.dialogDescription}>
            {isEditing ? t('taskForm.editDescription') : t('taskForm.createDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="task-form" onSubmit={form.handleSubmit(handleFormSubmit)} className={style.form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className={style.formField}>
                  <FormLabel className={style.formLabel}>{t('taskForm.titleLabel')}</FormLabel>
                  <FormControl>
                    <Input className={style.formInput} placeholder={t('taskForm.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className={style.formField}>
                  <FormLabel className={style.formLabel}>{t('taskForm.descriptionLabel')}</FormLabel>
                  <FormControl>
                    <Textarea className={style.formInput} placeholder={t('taskForm.descriptionPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className={style.formField}>
                  <FormLabel className={style.formLabel}>{t('taskForm.statusLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={style.selectTrigger}>
                        <SelectValue placeholder={t('taskForm.statusPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={style.selectContent}>
                      {statusOptions.map(opt => (
                        <SelectItem className={style.selectItem} key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={style.formRow}>
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className={style.formField}>
                    <FormLabel className={style.formLabel}>{t('taskForm.dueDateLabel')}</FormLabel>
                    <div className={style.datePickerContainer}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              className={style.datePickerTrigger}
                              aria-label={t('taskForm.dueDatePlaceholder')}

                            >
                              <CalendarIcon size={20} />
                              {field.value ? format(field.value, 'PPP', { locale: dateLocale }) : <span>{t('taskForm.dueDatePlaceholder')}</span>}
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[var(--date-picker-bg)] text-[var(--date-picker-text-color)]">
                          <Calendar
                            className={style.calendar}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }} // Desabilita visualmente as datas passadas
                            autoFocus
                            aria-label={t('taskForm.dueDatePlaceholder')} />
                        </PopoverContent>
                      </Popover>
                      {field.value && (
                        <button
                          type="button"
                          onClick={() => form.setValue('dueDate', undefined , { shouldValidate: true })
                          }
                          className={style.clearDateButton}
                          aria-label={t('taskForm.clearDate')}
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className={style.formField}>
                    <FormLabel className={style.formLabel}>{t('taskForm.priorityLabel')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={style.selectTrigger }>
                          <SelectValue  placeholder={t('taskForm.priorityPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={style.selectContent}>
                        {priorityOptions.map(opt => (
                          <SelectItem className={style.selectItem} key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className={style.formBtns}>
          <DialogClose asChild>
            <button type="button" className={style.cancelButton}>{t('common.cancel')}</button>
          </DialogClose>
          <button type="submit" form="task-form" className={style.submitButton}>
            {isEditing ? t('taskForm.submitEdit') : t('taskForm.submitCreate')}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskFormDialog;
export type  {TaskFormValues};
