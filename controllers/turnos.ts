import { Request, Response } from "express";

import { ObjectId } from "mongoose";

import Turno, { ITurno } from "../models/turnos";
import { sendToAdminEmail } from "../mailer/mailer";
import { IUser } from "../models/usuario";

export const getUserTurnos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const usuarioId: ObjectId = req.body.usuarioConfirmado._id; //esto viene de la validacion del JWT

  const consulta = { user: usuarioId };

  const turnos = await Turno.find(consulta); //busco en la base de datos todas (ver que uso find y no findOne) las ordenes que tiene el usuario

  res.json({
    data: [...turnos],
  });
};

export const createTurno = async (
  req: Request,
  res: Response
): Promise<void> => {
  const usuarioId: ObjectId = req.body.usuarioConfirmado._id;

  const usuario: IUser = req.body.usuarioConfirmado;

  const turnoData: ITurno = req.body;

  const data = {
    ...turnoData, //toda la data que viene del body
    user: usuarioId, //le agremmos la info del usuario
    nombre: usuario.nombre,
    surname: usuario.surname,
    age: usuario.age,
    email: usuario.email,
    cellphone: usuario.cellphone,
    location: usuario.location,
    address: usuario.address,
    height: usuario.height,
    weight: usuario.weight,
    experience: usuario.experience,
    createdAt: new Date(), //le agremmos la fecha de creacion
    status: "Pendiente", //le agremmos el estado por defecto "Pendiente"
  };

  const turno = new Turno(data);

  await turno.save();

  await sendToAdminEmail(usuario, turnoData); //enviamos el email para verificar el usuario

  res.status(201).json({
    turno,
  });
};

export const AdminGetTurnos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const consulta = req.body;

  delete consulta.usuarioConfirmado;

  const turnos = await Turno.find(consulta);

  res.json({
    data: [...turnos],
  });
};

export const getHours = async (req: Request, res: Response): Promise<void> => {
  const date = req.body;
  try {
    const turnos = await Turno.find(date);
    if (!turnos) {
      //si no existe respondemos con el error
      res.status(400).json({
        msg: "no hay turnos reservados para ese dia",
      });
      return;
    }

    const hours = turnos.map((e) => e.hour);
    res.json({
      data: [...hours],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const statusTurno = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id, status } = req.body; //desestructuramos la respuesta que viene en el body de la Request

  try {
    const turno = await Turno.findOne({ _id });

    if (!turno) {
      //si no existe el usuario respondemos con el error
      res.status(400).json({
        msg: "No se encontró el turno en la base de datos",
      });
      return;
    }

    //si esta todo OK, actualizo el usuario
    const turnoActualizado = await Turno.findOneAndUpdate(
      { _id },
      { status: status }
    );
    //y respondo al front
    res.status(200).json({
      msg: "turno actualizado con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const deleteTurno = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.body; //desestructuramos la respuesta que viene en el body de la Request

  try {
    const turno = await Turno.findOne({ _id });

    if (!turno) {
      //si no existe el usuario respondemos con el error
      res.status(400).json({
        msg: "No se encontró el turno en la base de datos",
      });
      return;
    }

    //si esta todo OK, actualizo el usuario
    const turnoEliminado = await Turno.findOneAndDelete({ _id });
    //y respondo al front
    res.status(200).json({
      msg: "turno eliminado con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};
