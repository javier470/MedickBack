import { Router } from "express";
import {
    buyMedicamento,
    createMedicamento,
    DeleteMedicamento,
    getMedicamento,
    getMedicamentos,
    notifyExpirado,
    UpdateMedicamento
} from '../controllers/Medicamentos.controller.js'
import { VerifyToken, VerifyUser } from "../utils/jwt.js";

const router = Router();

router.get("/validateExp", [VerifyToken, VerifyUser], notifyExpirado);
router.get("/", [VerifyToken], getMedicamentos);
router.get("/:id", [VerifyToken], getMedicamento);
router.post("/", [VerifyToken, VerifyUser], createMedicamento);
router.put("/:id", [VerifyToken, VerifyUser], UpdateMedicamento);
router.put("/buy/:id", [VerifyToken], buyMedicamento);
router.delete("/:id", [VerifyToken, VerifyUser], DeleteMedicamento);

export default router;
