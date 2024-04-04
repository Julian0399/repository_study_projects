import {z} from "zod";

// define el esquema de validación para la creación de una tarea
export const createTaskSchema = z.object({
    // title es un string requerido
    title: z.string({
        required_error: "Title is required",
    }),
    // description es un string requerido
    description: z.string({
        required_error: "Description is required",
    }),
    date : z.string().datetime().optional(),
});