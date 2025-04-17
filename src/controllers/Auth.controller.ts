import { Request, Response } from "express";
import { DecryptPass, EncryptPass, validateExistData } from "../utils/utils.js";
import Usuario from "../models/Usuarios.model.js";
import { CreateJWT } from "../utils/jwt.js";

export const UserLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    validateExistData({ username, password }, res);
    try {
        const existUser = await Usuario.findOne({ where: { Email_Usuario: username } });
        if (!existUser) {
            return res.status(404).json({ message: `Usuario o contraseña inválidos` })
        }
        let resHash = await DecryptPass(password, existUser.dataValues.Password_Usuario);
        if (resHash) {
            let token = CreateJWT(existUser.dataValues);
            return res.status(200).json({ token, message: "Sesión Iniciada" })
        } else {
            return res.status(400).json({ message: "Usuario o contraseña inválidos" })
        }
    } catch (err) {
        return res.status(500).json({ message: "Error al iniciar sesión", error: err });
    }
}


export const RegisterUser = async (req: Request, res: Response) => {
    const { nombre, apellido, email, password, repeat_password, IdEspecialidad, IdRole } = req.body;

    validateExistData({ nombre, email, password, repeat_password, IdEspecialidad, IdRole }, res);
    try {
        if (password !== repeat_password) return res.status(400).json({ message: `Las contraseñas no coinciden` });

        const existUser = await Usuario.findOne({ where: { Email_Usuario: email } });
        if (existUser === null) {
            let passE = await EncryptPass(password);
            console.log(passE)
            let nuevoUsuario = await Usuario.create({
                Nombre_Usuario: nombre,
                Apellido_Usuario: apellido,
                Email_Usuario: email,
                Password_Usuario: passE,
                IdEspecialidad: IdEspecialidad,
                IdRole: IdRole,
                Status_usuario: true
            })
            return res.status(200).json({ nuevoUsuario })
        } else {
            return res.status(400).json({ message: `Ya existe un correo registrado con esta dirección: ${email}` })
        }
    } catch (err) {
        return res.status(500).json({ message: "Error al intentar registrarse", error: err });
    }
}

export const Auth = async (req: Request, res: Response) => {
    
    return res.status(200).json({ message: 'OK' })
}