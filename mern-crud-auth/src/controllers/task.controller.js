import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  //se obtienen todas las tareas
  const tasks = await Task.find({
    user: req.user.id, //se obtienen las tareas del usuario que esta autenticado
  }).populate("user"); //se obtiene la informacion del usuario que creo la tarea
  res.json(tasks);
};
export const createTask = async (req, res) => {
  try {
    //se crea una nueva tarea
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id, //se asigna el id del usuario que creo la tarea
    });
    const saveTask = await newTask.save();
    res.json(saveTask);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
export const getTask = async (req, res) => {
  //se busca una tarea en especifico por el id
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
export const deleteTask = async (req, res) => {
  //elimina una tarea en especifico por el id
  const task = await Task.findByIdAndDelete(req.params.id).populate("user"); //se obtiene la informacion del usuario que creo la tarea
  try {
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found and can't be deleted" });
    }
    return res.sendStatus(204); //no hay contenido para mostrar porque se elimino
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
export const updateTask = async (req, res) => {
  try {
    //actualiza una tarea en especifico por el id
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new:true para que devuelva el objeto actualizado no el anterior
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found and can't be updated" });
    }
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
