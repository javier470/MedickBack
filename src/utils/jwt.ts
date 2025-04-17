import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUsuario } from '../interfaces/Usuarios.interface.js';
import { NextFunction, Request, Response } from 'express';
import { IJWTPayload } from '../interfaces/JWT.interface.js';

dotenv.config();

export const CreateJWT = (user: IUsuario): string => {
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT secret key is not defined');
        }
        let token = jwt.sign(
            {
                id: user.IdUsuario,
                name: user.Nombre_Usuario,
                last_name: user.Apellido_Usuario,
                email: user.Email_Usuario,
            },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: '2d'
            }
        )

        return token
    } catch (err) {
        throw new Error(`${err}`);
    }
}

export function VerifyToken(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers.authorization;

    if (!process.env.JWT_SECRET_KEY) {
        return res.status(401).json({ error: 'JWT secret key is not defined' });
    }
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' });
    }
    if (!token.includes("Bearer ")) {
        return res.status(401).json({ error: 'Bearer Acceso denegado' });
    }
    try {
        let sToken = token.split(" ")[1];
        const decoded: any = jwt.verify(sToken, process.env.JWT_SECRET_KEY);
        if (new Date(decoded["exp"] * 1000) > new Date()) {
            return res.status(401).json({ error: 'Acceso denegado' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}