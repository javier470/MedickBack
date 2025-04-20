import { Request, Response } from "express";
import Medicamento from "../models/Medicamentos.model.js";
import { validateExistData } from "../utils/utils.js";
import { saveInHistory } from "./RegistroMedicamentos.controller.js";

export const getMedicamentos = async (_req: Request, res: Response) => {
    const medicamentos = await Medicamento.findAll();
    res.json(medicamentos);
};

export const getMedicamento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const medicamento = await Medicamento.findByPk(Number(id));

        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento no encontrado" });
        }

        return res.json(medicamento);
    } catch (err) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const createMedicamento = async (req: Request, res: Response) => {
    const {
        Nombre_Medicamento,
        Fecha_Exp,
        Stock,
        Precio,
        Marca
    } = req.body;

    const data = {
        Nombre_Medicamento,
        Fecha_Ingreso: new Date(),
        Fecha_Exp,
        Stock,
        Precio,
        Marca,
        Status_Medicamento: true
    }
    validateExistData(data, res)
    try {
        let registeredData = await Medicamento.findAll();
        let matchedData = registeredData.filter(mdc => mdc.dataValues.Nombre_Medicamento == data.Nombre_Medicamento && mdc.dataValues.Marca == data.Marca)
        if (matchedData.length > 0) {
            let updated = await matchedData[0].update({ Stock: matchedData[0].dataValues.Stock + data.Stock, Fecha_Exp: data.Fecha_Exp });
            return res.status(201).json({ message: `Se ha actualizado el registro ${updated.dataValues.Nombre_Medicamento}, Stock: ${updated.dataValues.Stock}` });
        } else {
            const nuevoMedicamento = await Medicamento.create(data);
            return res.status(201).json(nuevoMedicamento);
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear el medicamento" });
    }
}

export const notifyExpirado = async (_req: Request, res: Response) => {
    const today = new Date();
    const medicamentos = await Medicamento.findAll();
    let validacionMedicamentos = [];

    for (let i = 0; i < medicamentos.length; i++) {
        let fechaExp = new Date(medicamentos[i].dataValues.Fecha_Exp);
        let diffTime = today.getTime() - fechaExp.getTime();
        let fechaDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let estado = 'OK';
        if (fechaDiff > 0) estado = 'Expirado';
        if (fechaDiff < 0 && fechaDiff > -30) estado = 'Proximo a vencer';
        if (fechaDiff < -30) estado = 'OK'
        validacionMedicamentos.push({ medicamento: medicamentos[i].dataValues.Nombre_Medicamento, days: fechaDiff * -1, status: estado })
        console.log(`Medicamento ${i}: ${fechaDiff} días de diferencia, ${medicamentos[i].dataValues.Fecha_Exp}`);

    }
    return res.json(validacionMedicamentos);
}

export const buyMedicamento = async (req: Request, res: Response) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        const medicamento = await Medicamento.findByPk(Number(id));

        if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

        await medicamento.update({ Stock: medicamento.dataValues.Stock - quantity })
            .then(() => {
                saveInHistory(quantity, quantity * medicamento.dataValues.Precio, medicamento.dataValues.IdMedicamento, res);
            });
        return res.status(404).json({ message: `Compra realizada de ${medicamento.dataValues.Nombre_Medicamento} cantidad: ${quantity}` });
    } catch (err) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const UpdateMedicamento = async (req: Request, res: Response) => {
    const {
        Nombre_Medicamento,
        Fecha_Exp,
        Stock,
        Precio,
        Marca
    } = req.body;
    const { id } = req.params;

    try {
        const medicamento = await Medicamento.findByPk(id);
        if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

        await medicamento.update({
            Nombre_Medicamento,
            Fecha_Exp,
            Stock,
            Precio,
            Marca
        });

        return res.status(200).json(medicamento);
    } catch (err) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const DeleteMedicamento = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const medicamento = await Medicamento.findByPk(id);
        if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

        await medicamento.update({ Status_Medicamento: false });
        res.json({ message: "Medicamento eliminado" });
    } catch (err) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}