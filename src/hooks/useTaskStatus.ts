import { useMemo } from 'react';
import getTaskStatus from '../utils/getTaskStatus';


/**
 * Hook customizado para calcular o status de expiração e formatar a data de uma tarefa.
 * @param dueDate - A data de vencimento da tarefa no formato 'YYYY-MM-DD'.
 * @returns Um objeto contendo o status de expiração e a data formatada.
 */
export const useTaskStatus = (dueDate: string) => {
  const status = useMemo(() => getTaskStatus(dueDate), [dueDate]);

  return status;
};