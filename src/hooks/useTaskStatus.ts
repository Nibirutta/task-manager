import { useMemo } from 'react';
import getTaskStatus from '../utils/getTaskStatus';



export const useTaskStatus = (dueDate: string) => {
  const status = useMemo(() => getTaskStatus(dueDate), [dueDate]);

  return status;
};