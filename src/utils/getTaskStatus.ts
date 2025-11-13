export type ExpirationStatus = "expired" | "deadline" | "in-time";

/**
 * Calcula o status de expiração de uma tarefa com base na data de vencimento.
 * @param dueDate - A data de vencimento da tarefa em formato de string ISO (ex: '2024-10-25T10:30:00.000Z').
 * @returns O status de expiração como 'expired', 'deadline' ou 'in-time'.
 */
const getTaskExpirationStatus = (
  dueDate: string | undefined
): ExpirationStatus => {
  if (!dueDate) {
    return "in-time"; // Tarefas sem data não expiram
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const timeDiff = due.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let expirationStatus: ExpirationStatus;
  if (daysDiff < 0) {
    expirationStatus = "expired";
  } else if (daysDiff <= 1) {
    expirationStatus = "deadline";
  } else {
    expirationStatus = "in-time";
  }

  return expirationStatus;
};

export { getTaskExpirationStatus };
