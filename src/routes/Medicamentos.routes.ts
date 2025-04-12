import { Router } from "express";
import {
    buyMedicamento,
    createMedicamento,
    getMedicamento,
    getMedicamentos,
    notifyExpirado
} from '../controllers/Medicamentos.controller.js'

const router = Router();

router.get("/validateExp", notifyExpirado);
router.get("/", getMedicamentos);
router.get("/:id", getMedicamento);
router.post("/", createMedicamento);
router.put("/buy/:id", buyMedicamento);

export default router;
