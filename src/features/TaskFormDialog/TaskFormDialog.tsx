import  { useEffect } from 'react';
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
import type { ITask, INewTask, IUpdateTask, TaskPriority, TaskStatus } from '../../types/taskTypes';
import { Input } from '../../lib/Reui/input/input';
import { Textarea } from '../../lib/Reui/textArea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../lib/Reui/select/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/Reui/popover/popover';
import { Calendar } from '../../lib/Reui/calendar/calendar';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import cn from '../../lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import style from './TaskFormDialog.module.css';

const taskFormSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
  description: z.string().optional(),
  // 1. Tornamos o campo opcional para permitir o estado "limpo" (null/undefined)
  // 2. Usamos .refine() para garantir que o campo não seja nulo na submissão.
  dueDate: z.date().optional().refine(date => date !== undefined && date !== null, {
    message: 'A data de vencimento é obrigatória.',
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent', 'optional'], {
    error: 'A prioridade é obrigatória.',
  }),
  status: z.enum(['to-do', 'in-progress', 'in-review', 'done'], {
    error: 'O status é obrigatório.',
  }),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  taskToEdit: ITask | null; // Se for null, é um formulário de criação
  initialStatus?: TaskStatus; // Status inicial ao criar uma nova tarefa
  onSubmit: (data: INewTask | IUpdateTask) => void;
}

// Opções para os selects do formulário
const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
  { value: 'optional', label: 'Opcional' },
];

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'to-do', label: 'Pendente' },
  { value: 'in-progress', label: 'Em Progresso' },
  { value: 'in-review', label: 'Em Revisão' },
  { value: 'done', label: 'Concluído' },
];

function TaskFormDialog({ isOpen, onOpenChange, taskToEdit, initialStatus, onSubmit }: TaskFormDialogProps) {
  const isEditing = taskToEdit !== null;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: undefined,
      priority: 'medium',
      status: initialStatus || 'to-do',
    },
  });

  useEffect(() => {
    if (isEditing) {
      // Popula o formulário com os dados da tarefa para edição
      form.reset({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        dueDate: new Date(taskToEdit.dueDate),
        priority: taskToEdit.priority,
        status: taskToEdit.status,
      });
    } else {
      // Reseta para os valores padrão de criação
      form.reset({
        title: '',
        description: '',
        dueDate: undefined,
        priority: 'medium',
        status: initialStatus || 'to-do',
      });
    }
  }, [taskToEdit, initialStatus, isOpen, form, isEditing]);

  const handleFormSubmit = (data: TaskFormValues) => {
    if (isEditing) {
      // Garantimos que taskToEdit não é nulo e criamos o objeto IUpdateTask
      const updatedData: IUpdateTask = { id: taskToEdit!.id, ...data };
      onSubmit(updatedData);
    } else {
      // Criamos um objeto que corresponde exatamente ao tipo INewTask
      const newData: INewTask = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate!, // Usamos '!' para afirmar que a data não será nula aqui, pois o Zod já validou
        priority: data.priority,
        status: data.status,
      };
      onSubmit(newData);
    }
    onOpenChange(false); // Fecha o modal após submeter
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Altere os detalhes da sua tarefa.' : 'Preencha as informações para criar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="task-form" onSubmit={form.handleSubmit(handleFormSubmit)} className={style.form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Desenvolver a tela de login" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Adicione mais detalhes sobre a tarefa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Vencimento</FormLabel>
                    <div className={style.datePickerContainer}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              className={cn(style.datePickerTrigger, !field.value && 'text-muted-foreground')}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP', { locale: ptBR }) : <span>Escolha uma data</span>}
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {field.value && (
                        <button
                          type="button"
                          // 3. Usamos `null` em vez de `undefined` para limpar o campo.
                          onClick={() => form.setValue('dueDate', undefined , { shouldValidate: true })
                          }
                          className={style.clearDateButton}
                          aria-label="Limpar data"
                        >
                          <X size={16} />
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
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
        <DialogFooter>
          <DialogClose asChild>
            <button type="button" className={style.cancelButton}>Cancelar</button>
          </DialogClose>
          <button type="submit" form="task-form" className={style.submitButton}>
            {isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskFormDialog;
