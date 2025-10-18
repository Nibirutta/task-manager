import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../lib/Reui/select/select";
import type { TaskPriority } from "../../types/taskServiceTypes";

type TaskFilterProps = {
    filterPriority: TaskPriority | "all";
    setFilterPriority: React.Dispatch<React.SetStateAction<TaskPriority | "all">>;
    priorityFilterOptions: { value: TaskPriority | "all"; label: string }[];
};
  

const TaskFilter = ({
    filterPriority,
    setFilterPriority,
    priorityFilterOptions,
}: TaskFilterProps) => {
  return (
    <Select
      value={filterPriority}
      onValueChange={(value) =>
        setFilterPriority(value as TaskPriority | "all")
      }
    >
      <SelectTrigger className="py-4 px-7 h-auto w-auto cursor-pointer text-2xl font-bold font-(family-name:--task-filter-trigger-text-font)  bg-[var(--task-filter-trigger-bg-color)] hover:bg-[var(--task-filter-trigger-bg-hover)] active:bg-[var(--task-filter-trigger-bg-active)] 
      hover:text-[var(--task-filter-trigger-text-hover)] active:text-[var(--task-filter-trigger-text-active)]
      border-[var(--task-filter-trigger-border-color)] hover:border-[var(--task-filter-trigger-border-hover)] active:border-[var(--task-filter-trigger-border-active)]
      shadow-[var(--task-filter-trigger-box-shadow)] hover:shadow-[var(--task-filter-trigger-box-shadow-hover)] active:shadow-[var(--task-filter-trigger-box-shadow-active)]
      text-[var(--task-filter-trigger-text-color)]
      
      ">
        <SelectValue placeholder="Filtrar por prioridade" />
      </SelectTrigger>
      <SelectContent className="flex flex-col gap-4 p-4 bg-[var(--task-filter-content-bg-color)]">
        {priorityFilterOptions.map((opt) => (
          <SelectItem className="py-3.5 mb-4 px-5 text-center text-xl cursor-pointer bg-[var(--task-filter-item-bg-color)] hover:bg-[var(--task-filter-item-bg-hover)] active:bg-[var(--task-filter-item-bg-active)] font-(family-name:--task-filter-item-text-font) 
          text-[var(--task-filter-item-text-color)] hover:text-[var(--task-filter-item-text-hover)] active:text-[var(--task-filter-item-text-active)]
          border
          border-[var(--task-filter-item-border-color)] hover:border-[var(--task-filter-item-border-hover)] active:border-[var(--task-filter-item-border-active)]
          shadow-[var(--task-filter-item-box-shadow)] hover:shadow-[var(--task-filter-item-box-shadow-hover)] active:shadow-[var(--task-filter-item-box-shadow-active)]
          " 
          key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TaskFilter;
