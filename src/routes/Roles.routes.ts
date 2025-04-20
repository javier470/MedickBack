import { Router } from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/Roles.controller.js";
import { VerifyToken, VerifyUser } from "../utils/jwt.js";

const router = Router();

router.get("/", [VerifyToken, VerifyUser], getRoles);
router.get("/:id", [VerifyToken, VerifyUser], getRoleById);
router.post("/", [VerifyToken, VerifyUser], createRole);
router.put("/:id", [VerifyToken, VerifyUser], updateRole);
router.delete("/:id", [VerifyToken, VerifyUser], deleteRole);

export default router;
