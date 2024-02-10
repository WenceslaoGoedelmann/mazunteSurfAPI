import { NextFunction, Request, Response } from "express";

import jwt, {JwtPayload} from "jsonwebtoken"

import Usuario,{IUser} from "../models/usuario";

const validarJWT =async (req:Request, res:Response, next: NextFunction):Promise<void> => {

    const token = req.headers["x-token"] as string; //guardo el token enviado desde el front

    if(!token){ //si no lo enviaron tiro error
        res.status(401).json({
            msg: "No hay token en la peticion"
        })
        return;
    }

    try{
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload; //de esta forma "desencripto" el token, osea la respuesta va a ser el id del usuario

        const {id} = payload;

        const usuarioConfirmado: IUser | null = await Usuario.findById(id) //busco el usuario con el id "findById" en la base de datos

        if(!usuarioConfirmado){//si no encuentro el usuario le tiro el error
            res.status(401).json({
                msg: "Token no válido"
            })
            return;
        }

        req.body.usuarioConfirmado = usuarioConfirmado // agrego en el body de la Request la data del usuario

        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            msj: "Token no válido"
        })
    }
    
}

export default validarJWT