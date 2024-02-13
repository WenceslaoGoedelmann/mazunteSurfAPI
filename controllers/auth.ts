import { Request, Response } from "express";
import Usuario,{IUser} from "../models/usuario";
import bcryptjs from "bcryptjs"
import randomstring from "randomstring"
import { ROLES } from "../helpers/constants";
import { sendEmail } from "../mailer/mailer";
import generarJWT from "../helpers/generarJWT";


//creamos el controlador para registrar un usuario
export const register =async (req:Request, res:Response):Promise<void> => {
    
    const {nombre, email, password,cellphone,location,address, height,weight,experience}: IUser = req.body //desestructuramos la respuesta que viene en el body de la Request
    
    const usuario = new Usuario({nombre, email, password,cellphone,location,address, height,weight,experience }) //creamos el nuevo usuario utilizando el esquema de usuario

    const salt = bcryptjs.genSaltSync() //creamos el salto para encriptar la contrasenia

    usuario.password = bcryptjs.hashSync(password, salt) //a la contrasenia del usuario ahora le asignamos lo que nos devuelve la encriptacion

    const adminKey = req.headers["admin-key"] //vemos si en el heder de la request viene una clave valor "admin-key"

    if(adminKey === process.env.KEYFORADMIN){ //si viene y es igual a la que tengo guadada, le asigno el rol de administrador al usuarion, no viene queda con el rol por defecto "user"
        usuario.rol = ROLES.admin   
    }

    const newCode = randomstring.generate(6); //creamos un codigo random que le vamos a enviar por mail para verificar el usuario

    usuario.code = newCode //le asignamos ese codigo al usuario

    await usuario.save() //guardamos el usuario

    await sendEmail(email, newCode) //enviamos el email para verificar el usuario

    res.status(201).json({ //respondemos al front con los datos del usuario
        usuario
    })

}

//creamos el controlador para verificar un usuario
export const verifyUser =async (req:Request, res:Response):Promise<void> => {
    const { email, code } = req.body //desestructuramos la respuesta que viene en el body de la Request
    
    try{
        const usuario = await Usuario.findOne({email}) //buscamos el usuario en la base de datos con el email

        if(!usuario){ //si no existe el usuario respondemos con el error
            res.status(400).json({
                msg: "No se encontró el email en la base de datos"
            })
            return
        }

        if(usuario.verified){ //si el usuario ya esta verificado respondemos con el erro
            res.status(400).json({
                msg: "El usuario está correctamente verificado"
            })
            return
        }

        if(usuario.code !== code){ //comparamos el codigo enviado
            res.status(401).json({
                msg: "El código ingresado de incorrecto"
            })
            return
        }
        
        //si esta todo OK, actualizo el usuario
        const usuarioActualizado = await Usuario.findOneAndUpdate({email},{verified: true})
        //y respondo al front
        res.status(200).json({
            msg: "Usuario verificado con éxito"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}

//creamos el controlador para loguearnos
export const login =async (req:Request, res: Response):Promise<void> => {
    const {email, password }:IUser = req.body //desestructuramos la respuesta que viene en el body de la Request

    try{
        const usuario = await Usuario.findOne({email}) //llamamos a la base de datos para ver si existe el usuario

        if(!usuario){ //si no exite respondemos con el error
            res.status(400).json({
                msg: "No se encontró el email en la base de datos"
            });
            return
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password) //verificamos que la contrasenia este ok

        if(!validarPassword){// si no es correcta respondemos con el error
            res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
            return;
        }

        const token = await generarJWT(usuario.id) //generamos el token, pasandole el id del usuario

        res.json({ //respondemos con la data del usuario y el token
            usuario,
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}
