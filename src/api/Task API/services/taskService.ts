import type {
  IDeleteTask,
  IGetTasks,
  ITask,
  INewTask,
  IUpdateTask,
} from "../../../types/taskTypes";

import {
  createTaskRoute,
  deleteTaskRoute,
  getTasksRoute,
  updateTaskRoute,
} from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const getTasks = async (params: IGetTasks, acessToken: string): Promise<ITask[]> => {

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  console.groupCollapsed('🚀 API Request: getTasks');
  console.log('Filters sent:', params);
  console.groupEnd();
  const queryString = queryParams.toString();

  const response = await apiFetch(
    `${getTasksRoute.route}${queryString ? `?${queryString}` : ''}`,
    { method: getTasksRoute.method },
    acessToken);

  console.groupCollapsed('✅ API Response: getTasks');
  console.log('Data received:', response);
  console.groupEnd();

  return response || [];
};

const newTask = async (params: INewTask, acessToken: string): Promise<{ data: ITask }> => {
  console.groupCollapsed('🚀 API Request: newTask');
  console.log('Data sent:', params);
  const response = await apiFetch(
    createTaskRoute.route,
    {
      method: createTaskRoute.method,
      body: JSON.stringify(params),
    },
    acessToken
  );
  console.log('Response received:', response);
  console.groupEnd();

  return response;
};

const updateTask = async (params: IUpdateTask, acessToken: string): Promise<{ data: ITask }> => {
  console.groupCollapsed('🚀 API Request: updateTask');
  console.log('ID to update:', params._id);
  console.log('Data sent:', params);

  const { _id, ...updateData } = params; 
  const response = await apiFetch(
    `${updateTaskRoute.route}/${_id}`,
    {
      method: updateTaskRoute.method,
      body: JSON.stringify(updateData), 
    },
    acessToken
  );
  console.log('Response received:', response);
  console.groupEnd();

  return response;
};

const deleteTask = async (params: IDeleteTask, acessToken: string) => {
  console.groupCollapsed('🚀 API Request: deleteTask');
  console.log('ID to delete:', params._id);

  const response = await apiFetch(
    `${deleteTaskRoute.route}/${params._id}`, 
    {
      method: deleteTaskRoute.method,
    },
    acessToken
  );
  console.log('Response received (should be undefined on success):', response);
  console.groupEnd();

  return response;
};

export { getTasks, newTask, updateTask, deleteTask };
