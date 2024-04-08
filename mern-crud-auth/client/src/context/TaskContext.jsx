//contexto para las tareas
import { createContext, useContext, useState } from "react";
// se importa el hook useContext
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";
import { get } from "mongoose";

const TaskContext = createContext();
// se valida que el hook useContext no este vacio
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask debe estar dentro del proveedor TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  //funcion para crear tareas
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id)); // se filtra el id de la tarea a eliminar
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateTask = async (id,task) => {
    try {
      await updateTaskRequest(id,task);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
