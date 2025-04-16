import { Router } from "express";
import { CreateEspecialidad } from "../controllers/Especialidades.controller.js";

const router = Router();

router.post("/", CreateEspecialidad);

export default router;
