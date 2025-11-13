import { useMemo } from "react";
import { getTaskExpirationStatus } from "../utils/getTaskStatus";

export const useTaskStatus = (dueDate: string) => {
  const status = useMemo(() => getTaskExpirationStatus(dueDate), [dueDate]);

  return status;
};
