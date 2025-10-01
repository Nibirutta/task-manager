import type {
  IDeleteTask,
  IGetTasks,
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

const getTasks = async (params: IGetTasks, acessToken: string) => {
  // Constrói os parâmetros de query dinamicamente
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  const queryString = queryParams.toString();

  const response = await apiFetch(
    `${getTasksRoute.route}${queryString ? `?${queryString}` : ''}`,
    { method: getTasksRoute.method },
    acessToken);
  return response;
};

const newTask = async (params: INewTask, acessToken: string) => {
  const response = await apiFetch(
    createTaskRoute.route,
    {
      method: createTaskRoute.method,
      body: JSON.stringify(params),
    },
    acessToken
  );
  return response;
};

const updateTask = async (params: IUpdateTask, acessToken: string) => {
  const response = await apiFetch(
    `${updateTaskRoute.route}/${params.id}`,
    {
      method: updateTaskRoute.method,
      body: JSON.stringify(params),
    },
    acessToken
  );
  return response;
};

const deleteTask = async (params: IDeleteTask, acessToken: string) => {
  const response = await apiFetch(
    `${deleteTaskRoute.route}/${params.id}`,
    {
      method: deleteTaskRoute.method,
    },
    acessToken
  );
  return response;
};

export { getTasks, newTask, updateTask, deleteTask };
