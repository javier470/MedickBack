import { Request, Response } from "express";
import Role from "../models/Roles.model.js";
import { IRol } from "../interfaces/Roles.interface.js";

export const getRoles = async (_req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.json(roles);
};

export const getRoleById = async (req: Request, res: Response) => {
  const role = await Role.findByPk(req.params.id);
  if (!role) return res.status(404).json({ message: "Rol no encontrado" });
  res.json(role);
};

export const createRole = async (req: Request, res: Response) => {
    const { Nombre_Rol, Status_rol } = req.body;
  
    try {
      const nuevoRol = await Role.create({
        Nombre_Rol,
        Status_rol: true
      });
      res.status(201).json(nuevoRol);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el rol" });
    }
  };

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Nombre_Rol, Status_rol } = req.body;

  const rol = await Role.findByPk(id);
  if (!rol) return res.status(404).json({ message: "Rol no encontrado" });

  await rol.update({ Nombre_Rol, Status_rol });
  res.json(rol);
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rol = await Role.findByPk(id);
  if (!rol) return res.status(404).json({ message: "Rol no encontrado" });

  await rol.destroy();
  res.json({ message: "Rol eliminado" });
};
