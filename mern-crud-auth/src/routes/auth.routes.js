import { Router } from "express";
// Import the functions from controller
import { login,logout,register, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
// Create a new router
const router = Router();
// las rutas son definidas 
router.post('/register', register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/profile', authRequired, profile)

export default router;