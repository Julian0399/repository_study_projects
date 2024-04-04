import { z } from "zod";
// define el esquema de validación para el registro de usuario
export const registerSchema = z.object({
  // username es un string requerido
  username: z.string({
    required_error: "Username is required",
  }), // email es un string requerido y debe ser un email válido
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }), // password es un string requerido y debe tener al menos 6 caracteres
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
// define el esquema de validación para el inicio de sesión
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }), // password es un string requerido y debe tener al menos 6 caracteres
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
