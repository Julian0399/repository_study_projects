import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { get, set } from "mongoose";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// el use params se usa para obtener un objetos con los datos dinamicos que van en la URL
function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"))
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }
    if(data.date) dateValid.date = dayjs.utc(data.date).format();
    
    if (params.id) {
      updateTask(params.id,dateValid);
    } else {
      createTask(dateValid);
    }
    navigate("/tasks");
  });
  return (
    <div className="bg-slate-700 max-w-md w-full p-6 rounded-md ">
      <form
        onSubmit={onSubmit}
        className="flex flex-col aling-center text-black"
      >
        <label
          htmlFor="taskName"
          className="text-center text-lg m-1 text-white"
        >
          Nombre de la Tarea
        </label>
        <input
          type="text"
          name="taskName"
          placeholder="title"
          {...register("title")}
          className="rounded-md border-gray-400 p-2 m-4 "
          autoFocus
        />
        <label
          htmlFor="description"
          className="text-center text-lg m-1 text-white"
        >
          Descripcion de la tarea
        </label>
        <textarea
          rows="3"
          placeholder="description"
          {...register("description")} //devuelve un onchange un valeu y un name
          className="rounded-md border-gray-400 p-2 m-4 "
        ></textarea>
        <label htmlFor="date" className="text-center text-lg m-1 text-white">
          Fecha
        </label>
        <input
          type="date"
          {...register("date")}
          className="rounded-md  m-4 h-9 text-black font-light text-center"
        />
        <button
          type="submit"
          className="rounded-md bg-lime-200 m-4 h-9 text-black text-lg font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
