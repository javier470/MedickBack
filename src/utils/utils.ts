import { Response } from "express";
import bcrypt from 'bcrypt'

export const validateExistData = (data: Record<string, any>, res: Response) => {
    const dataEmpty: string[] = [];

    if (data) {
        for (const [key, value] of Object.entries(data)) {
            if (value !== null && value !== undefined && value !== "") {
                continue;
            } else {
                dataEmpty.push(key);
            }
        }
    }
    if (dataEmpty.length > 0) {
        return res.status(400).send({ error: `Los datos ${dataEmpty.toString()} no pueden ir vacios` })
    } return;
}

export async function EncryptPass(pass: string): Promise<string> {
    try {
        return bcrypt.genSalt(Number(process.env.SCOUNT))
            .then(res => bcrypt.hash(pass, res)
                .then(val => val)
                .catch(err => { throw new Error(err) }))
            .catch(err => { throw new Error(err) })
    } catch (err) {
        throw new Error(`${err}`)
    }
}


export async function DecryptPass(pass: string, hash: string) {
    try {
        return bcrypt.compare(pass, hash);
    } catch (err) {
        throw new Error(`${err}`)
    }
}