import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/Auth.routes.js";
import roleRoutes from "./routes/Roles.routes.js";
import especialidadRoutes from "./routes/Especialidades.routes.js";
import medicamentosRoutes from "./routes/Medicamentos.routes.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); 
app.use("/api/roles", roleRoutes); 
app.use("/api/especialidades", especialidadRoutes); 
app.use("/api/medicamentos", medicamentosRoutes); 

export default app;
