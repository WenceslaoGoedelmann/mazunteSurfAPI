import { Request, Response } from "express";

import { ObjectId } from "mongoose";

import Turno, { ITurno } from "../models/turnos";
import { sendToAdminEmail } from "../mailer/mailer";
import { IUser } from "../models/usuario";

export const getUserTurnos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const usuarioId: ObjectId = req.body.usuarioConfirmado._id; 

  const consulta = { user: usuarioId };

  const turnos = await Turno.find(consulta);

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
    ...turnoData, 
    user: usuarioId, 
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
    createdAt: new Date(), 
    status: "Pendiente", 
  };

  const turno = new Turno(data);

  await turno.save();

  await sendToAdminEmail(usuario, turnoData); 

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
  const { _id, status } = req.body; 

  try {
    const turno = await Turno.findOne({ _id });

    if (!turno) {
      
      res.status(400).json({
        msg: "No se encontró el turno en la base de datos",
      });
      return;
    }

    
    const turnoActualizado = await Turno.findOneAndUpdate(
      { _id },
      { status: status }
    );
    
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
  const { _id } = req.body;

  try {
    const turno = await Turno.findOne({ _id });

    if (!turno) {
      
      res.status(400).json({
        msg: "No se encontró el turno en la base de datos",
      });
      return;
    }

    
    const turnoEliminado = await Turno.findOneAndDelete({ _id });
    
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
