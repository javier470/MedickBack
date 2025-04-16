import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { IUsuario } from '../interfaces/Usuarios.interface.js';

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