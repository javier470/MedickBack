import { Router } from "express";
import { Auth, RegisterUser, UserLogin } from "../controllers/Auth.controller.js";
import { VerifyToken } from "../utils/jwt.js";

const router = Router();

router.get("/user/test", VerifyToken, Auth);
router.post("/user/login", UserLogin);
router.post("/user/register", RegisterUser);

export default router;
