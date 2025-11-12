
import type { CreatTaskRequestType, CreatTaskResponseType, DeleteTaskResponseType, GetTasksResponseType, UpdateTaskRequestType, UpdateTaskResponseType } from "../../../types/taskServiceTypes";
import {
  createTaskRoute,
  deleteTaskRoute,
  getTasksRoute,
  updateTaskRoute,
} from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const getTasks = async (filters: string): Promise<GetTasksResponseType> => {

  console.groupCollapsed('🚀 API Request: getTasks');
  console.log('Filters sent:', filters);
  console.groupEnd();

  const response = await apiFetch(
    `${getTasksRoute.route}${filters}`,
    { method: getTasksRoute.method });

  console.groupCollapsed('✅ API Response: getTasks');
  console.log('Data received:', response);
  console.groupEnd();

  return response || [];
};

const createTask = async (data: CreatTaskRequestType): Promise<CreatTaskResponseType> => {
  console.groupCollapsed('🚀 API Request: newTask');
  console.log('Data sent:', data);
  const response: CreatTaskResponseType = await apiFetch(
    createTaskRoute.route,
    {
      method: createTaskRoute.method,
      body: JSON.stringify(data)
    }
  );
  console.log('Response received:', response);
  console.groupEnd();

  return response ;
};

const updateTask = async (data: UpdateTaskRequestType, id: string): Promise<UpdateTaskResponseType> => {

  console.groupCollapsed('🚀 API Request: updateTask');
  console.log('ID to update:', id);
  console.log('Data sent:', data);

  const response: UpdateTaskResponseType = await apiFetch(
    `${updateTaskRoute.route}/${id}`,
    {
      method: updateTaskRoute.method,
      body: JSON.stringify(data),
    }
  );
  console.log('Response received:', response);
  console.groupEnd();

  return response;
};

const deleteTask = async (id: string) : Promise<DeleteTaskResponseType> =>  {
  console.groupCollapsed('🚀 API Request: deleteTask');
  console.log('ID to delete:', id);

  const response = await apiFetch(
    `${deleteTaskRoute.route}/${id}`, 
    {
      method: deleteTaskRoute.method
    }
  );
  console.log('Response received:', response);
  console.groupEnd();

  return response;
};

export { getTasks, createTask, updateTask, deleteTask };
