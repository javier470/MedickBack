import { Request, Response } from "express";
import HistorialMed from "../models/RegistroMedicamentos.model.js";
import { validateExistData } from "../utils/utils.js";

export const getReporteMed = async (_req: Request, res: Response) => {
    const hm = await HistorialMed.findAll();
    return res.json({ Historial: hm });
}

export const saveInHistory = async (Cantidad: number, Total: number, IdMedicamento: number, res: Response) => {

    try {
        const data = {
            Cantidad,
            Total,
            IdMedicamento
        }
        validateExistData(data, res)
        const newHistory = await HistorialMed.create(data);
        return "OK"

    } catch (err) {
        throw new Error(`${err}`);
    }
}