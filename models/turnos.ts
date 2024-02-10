import { Model, Schema, Types, model } from "mongoose";

export interface ITurno {
  createdAt: Date;
  user: Types.ObjectId;
  status: string;
  comment: string;
  date: string;
  hour: string;
  altura: string;
  peso: string;
  experience: string;
}

const TurnoSchema = new Schema<ITurno>({
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    altura: {
        type: String,
        required: true
    },
    peso: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },

})

const Turno: Model<ITurno> = model<ITurno>("Turno", TurnoSchema)

export default Turno
