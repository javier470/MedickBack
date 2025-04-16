import { Request, Response } from "express";
import { validateExistData } from "../utils/utils.js";
import Especialidad from "../models/Especialidad.model.js";

export const CreateEspecialidad = async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;

    validateExistData({ nombre, descripcion }, res);

    try {
        const nuevoRol = await Especialidad.create({
            Nombre_Especialidad: nombre,
            Descripcion_Especialidad: descripcion,
            Status_especialidad: true
        });
        res.status(201).json(nuevoRol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la especialidad", error: error });
    }
}