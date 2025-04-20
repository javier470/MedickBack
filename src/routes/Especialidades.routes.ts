import { Router } from "express";
import { CreateEspecialidad, DeleteEspecialidad, GetEspecialidades, UpdateEspecialidad } from "../controllers/Especialidades.controller.js";
import { VerifyToken, VerifyUser } from "../utils/jwt.js";

const router = Router();

router.get("/", [VerifyToken, VerifyUser], GetEspecialidades);
router.post("/", [VerifyToken, VerifyUser], CreateEspecialidad);
router.put("/:id", [VerifyToken, VerifyUser], UpdateEspecialidad);
router.delete("/:id", [VerifyToken, VerifyUser], DeleteEspecialidad);

export default router;
