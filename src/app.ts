import express, { Application } from "express";
import cors from "cors";
import roleRoutes from "./routes/Roles.routes.js";
import medicamentosRoutes from "./routes/Medicamentos.routes.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/roles", roleRoutes); 
app.use("/api/medicamentos", medicamentosRoutes); 

export default app;
