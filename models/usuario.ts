import {Model, Schema, model} from "mongoose"
import { ROLES } from "../helpers/constants";

//creamos la interface del usuario
export interface IUser {
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
    password: string;
    rol?: string;
    code?: string;
    verified?:boolean;
}
//creamos el schema del usuario
const UserSchema = new Schema<IUser>({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    surname:{
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    age:{
        type: String,
        required: [true, "La edad es obligatoria"]
    },
    email:{
        type:String,
        required: [true, "El correo es obgligatorio"]
    },
    cellphone:{
        type: String,
        required: [true, "El celular es obligatorio"]
    },
    location:{
        type: String,
        required: [true, "La ciudad es obligatoria"]
    },
    address:{
        type: String,
        required: [true, "La direccion es obligatoria"]
    },
    height: {
        type: String,
        required: [true, "La altura es obligatoria"]
    },
    weight: {
        type: String,
        required: [true, "El peso es obligatorio"]
    },
    experience: {
        type: String,
        required: [true, "La experiencia es obligatoria"]
    },
    password:{
        type:String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol:{
        type: String,
        default: ROLES.user
    },
    code:{
        type: String
    },
    verified:{
        type:Boolean,
        default:false
    }
})

//cuando creo un nuevo usuario, mongo automaticamente agrega un _v y _id al esquema del usuario
//con el siguiente metodo cuando le respondemos al front con la info del usuario no incluimos en la respuesta los siguientes valore "_v, password, _id, code"
UserSchema.methods.toJSON = function(){
    const {__v, password, _id, code, ...usuario } = this.toObject()
    return usuario
}

//creamos el modelo de usuario, en la base de datos se va a llamar "Usuario" y va a utilizar el esquema UserSchema y cuando lo usemos en la API lo llamamos como Usuario
const Usuario: Model<IUser> = model<IUser>("Usuario", UserSchema)

export default Usuario