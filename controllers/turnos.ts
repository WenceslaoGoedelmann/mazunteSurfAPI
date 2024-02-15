import { Request, Response } from "express";

import { ObjectId } from "mongoose";

import Turno, { ITurno } from "../models/turnos";
import { sendToAdminEmail } from "../mailer/mailer";
import { IUser } from "../models/usuario";

export const getUserTurnos =async (req:Request, res:Response): Promise<void> => {

    const usuarioId: ObjectId = req.body.usuarioConfirmado._id;//esto viene de la validacion del JWT

    const consulta = {user: usuarioId}

    const turnos = await Turno.find(consulta) //busco en la base de datos todas (ver que uso find y no findOne) las ordenes que tiene el usuario

    res.json({
        data: [ ...turnos]
    })
}

export const createTurno =async (req:Request, res:Response):Promise<void> => {
    const usuarioId: ObjectId = req.body.usuarioConfirmado._id;

    const usuario: IUser = req.body.usuarioConfirmado;

    const turnoData: ITurno = req.body;

    const data = {
        ...turnoData, //toda la data que viene del body
        user: usuarioId, //le agremmos la info del usuario
        nombre:usuario.nombre,
        surname:usuario.surname,
        email:usuario.email,
        createdAt: new Date(), //le agremmos la fecha de creacion
        status: "pending" //le agremmos el estado por defecto "pending"
    }

    const turno = new Turno(data);

    await turno.save()

    await sendToAdminEmail(usuario, turnoData) //enviamos el email para verificar el usuario

    res.status(201).json({
        turno
    })
}



export const AdminGetTurnos =async (req:Request, res:Response): Promise<void> => {

      const consulta = req.body
      
      delete consulta.usuarioConfirmado
   
  
    const turnos = await Turno.find(consulta) 

    res.json({
        data: [ ...turnos]
    })
}

export const getHours =async (req:Request, res:Response): Promise<void> => {
    const date = req.body;
    try {
        const turnos = await Turno.find(date) 
        if(!turnos){ //si no existe respondemos con el error
            res.status(400).json({
                msg: "no hay turnos reservados para ese dia"
            });
            return
        }

        const hours =turnos.map(e => e.hour)
        res.json({
            data: [...hours]
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

   
}


