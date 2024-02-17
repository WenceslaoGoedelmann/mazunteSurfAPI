import { Model, Schema, Types, model } from "mongoose";

export interface ITurno {
  createdAt: Date;
  user: Types.ObjectId;
  nombre: string;
  surname: string;
  age: string;
  email: string;
  cellphone: string;
  location: string;
  address: string;
  height: string;
  weight: string;
  experience: string;
  status: string;
  date: string;
  hour: string;
}

const TurnoSchema = new Schema<ITurno>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
});

const Turno: Model<ITurno> = model<ITurno>("Turno", TurnoSchema);

export default Turno;
