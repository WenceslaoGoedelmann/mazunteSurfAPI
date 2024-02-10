import { Request, Response } from "express";

import { ObjectId } from "mongoose";

import Turno, { ITurno } from "../models/turnos";
import { sendToAdminEmail } from "../mailer/mailer";
import { IUser } from "../models/usuario";

export const getTurnos =async (req:Request, res:Response): Promise<void> => {

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

export const getAllTurnos =async (req:Request, res:Response): Promise<void> => {
    //traer turnos segun una condicion:
    //const condicion = { status: "pending"}
    //const turnos = await Turno.find(condicion) 
   
    //traer todos los turnos:
    const turnos = await Turno.find() 

    res.json({
        data: [ ...turnos]
    })
}