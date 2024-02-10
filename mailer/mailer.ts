import nodemailer from "nodemailer"
import { IUser } from "../models/usuario"
import { ITurno } from "../models/turnos"

//Configuaracion del transporte
//recordar crear el correo con validacion en dos pasos
//en pass no va la contrasenia de la cuenta de gmail, va la que te da en la verificacion de dos pasos
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "simpsonzzappi@gmail.com",
        pass: "btwkqccpvpykghiy"
    },
    from: "simpsonzzappi@gmail.com"
})

// Función para enviar un correo electrónico

export const sendEmail =async (to:string, code: string):Promise<void> => {
    try{
        //configuracion de detalles para el correo electrónico
        const mailOptions={
            from: '"Simpsonzzapi" simpsonzzappi@gmail.com',
            to,
            subject: "Código de verificación para tu cuenta",
            text: `
                Llegó tu código para Simpsonzzapi.
                El código para verificarte es : ${code}
            `
        }
        //enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}

export const sendToAdminEmail =async (usuario: IUser, turnoData: ITurno):Promise<void> => {
    try{
        //configuracion de detalles para el correo electrónico
        const mailOptions={
            from: '"Simpsonzzapi" simpsonzzappi@gmail.com',
            to: "wengoe@gmail.com",
            subject: "Nuevo Turno",
            text: `
 El usuario ${usuario.nombre} ha creado un nuevo turno:
 Dia: ${turnoData.date} Hora: ${turnoData.hour} 
 Experiencia: ${turnoData.experience} 
 Altura: ${turnoData.altura} 
 Peso: ${turnoData.peso} 
 Comentario: ${turnoData.comment}    
            `
        }
        //enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}