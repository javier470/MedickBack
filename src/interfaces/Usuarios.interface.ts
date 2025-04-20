import Role from "../models/Roles.model.js";

export interface IUsuario{
    IdUsuario?: number;
    Nombre_Usuario: string;
    Apellido_Usuario: string;
    Email_Usuario: string;
    Password_Usuario: string;
    IdEspecialidad: number;
    IdRole: number;
    Status_usuario: boolean;
    Role?: Role;
}