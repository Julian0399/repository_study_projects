import { Router } from "express";
// Import the functions from controller
import { login,logout,register, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";
// Create a new router
const router = Router();
// las rutas son definidas 
router.post('/register', validateSchema(registerSchema),register)
router.post('/login',validateSchema(loginSchema), login)
router.post('/logout',logout)
router.get('/profile', authRequired, profile)

export default router;