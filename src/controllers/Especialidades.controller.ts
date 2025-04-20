import { Request, Response } from "express";
import { validateExistData } from "../utils/utils.js";
import Especialidad from "../models/Especialidad.model.js";

export const GetEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await Especialidad.findAll();
        return res.status(400).json({ especialidades });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las especialidades", error: error });
    }
}

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

export const UpdateEspecialidad = async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    const { id } = req.params;

    try {
        const especialidad = await Especialidad.findByPk(id);
        if (!especialidad) {
            return res.status(404).json({ message: 'Especialidad no encontrada' });
        }
        await especialidad.update({ Nombre_Especialidad: nombre, Descripcion_Especialidad: descripcion });

        return res.status(200).json(especialidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la especialidad", error: error });
    }
}

export const DeleteEspecialidad = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const especialidad = await Especialidad.findByPk(id);
        if (!especialidad) return res.status(404).json({ message: "Especialidad no encontrada" });

        await especialidad.update({Status_especialidad: false});
        res.json({ message: "Especialidad eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la especialidad", error: error });
    }
}