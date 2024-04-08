import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);
function TaskCard({ task }) {
    const {deleteTask} = useTasks()
  return (
    <div className="bg-slate-500 max-w-md w-full p-10 rounded-md ">
      <header className="flex justify-between">
      <h1 className="font-bold">{task.title}</h1>
      <div className="flex gap-x-2 items-center">
        <Link className="bg-blue-300 px-3 py-1 rounded-md hover:bg-blue-500" to={`/tasks/${task._id}`}>Editar</Link>
        <button 
        className="bg-red-300 px-3 py-1 rounded-md hover:bg-red-500"
        onClick={() =>{// se elimina la tarea
            deleteTask(task._id)
        }}>Eliminar</button>
      </div>
      </header>
      <p className="text-salete0300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}
export default TaskCard;
