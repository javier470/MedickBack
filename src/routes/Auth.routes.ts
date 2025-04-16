import { Router } from "express";
import { RegisterUser, UserLogin } from "../controllers/Auth.controller.js";

const router = Router();

router.post("/user/login", UserLogin);
router.post("/user/register", RegisterUser);

export default router;
