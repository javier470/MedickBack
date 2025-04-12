import { Request, Response } from "express";
import HistorialMed from "../models/RegistroMedicamentos.model.js";
import { validateExist } from "../utils/utils.js";

export const getReporteMed = async (_req: Request, res: Response) => {
    const hm = await HistorialMed.findAll();
    return res.json({ Historial: hm });
}

export const saveInHistory = async (Cantidad: number, Total: number, IdMedicamento: number) => {

    try {
        const data = {
            Cantidad,
            Total,
            IdMedicamento
        }
        if (validateExist(data)) {
            const newHistory = await HistorialMed.create(data);
            return "OK"
        }
    } catch (err) {
        throw new Error(`${err}`);
    }
}