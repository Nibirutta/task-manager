import formatDate from './formatDate';

export type ExpirationStatus = 'expired' | 'deadline' | 'in-time';

/**
 * Calcula o status de expiração e formata a data de uma tarefa.
 * @param dueDate - A data de vencimento da tarefa no formato 'YYYY-MM-DD'.
 * @returns Um objeto contendo o status de expiração e a data formatada.
 */
 const getTaskStatus = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueLocal = new Date(dueDate.replace(/-/g, '/'));
  dueLocal.setHours(0, 0, 0, 0);

  const timeDiff = dueLocal.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let expirationStatus: ExpirationStatus;
  if (daysDiff < 0) {
    expirationStatus = 'expired';
  } else if (daysDiff <= 1) {
    expirationStatus = 'deadline';
  } else {
    expirationStatus = 'in-time';
  }

  return { expirationStatus, formattedDueDate: formatDate(dueDate) };
};

export default getTaskStatus;