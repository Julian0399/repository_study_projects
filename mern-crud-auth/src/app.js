//usado para llamar el codigo del backend y config
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
//usado para leer las cookies
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an express application
const app = express();
app.use(cors({origin: "http://localhost:5173"}))

// para ver las petciiones que llegan al servidor en consola
app.use(morgan("dev"));
// para poder leer los datos que llegan en formato json
app.use(express.json());
// para poder leer las cookies
app.use(cookieParser());
// se definen las rutas
app.use("/api",authRoutes)
app.use("/api",taskRoutes)
// exportar app y se llama en el index
export default app;