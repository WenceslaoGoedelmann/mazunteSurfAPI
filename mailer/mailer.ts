import nodemailer from "nodemailer"
import { IUser } from "../models/usuario"
import { ITurno } from "../models/turnos"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "simpsonzzappi@gmail.com",
        pass: "btwkqccpvpykghiy"
    },
    from: "simpsonzzappi@gmail.com"
})



export const sendEmail =async (to:string, code: string):Promise<void> => {
    try{
        
        const mailOptions={
            from: '"Simpsonzzapi" simpsonzzappi@gmail.com',
            to,
            subject: "Código de verificación para tu cuenta",
            text: `
                Llegó tu código para Simpsonzzapi.
                El código para verificarte es : ${code}
            `
        }
        
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}

export const sendToAdminEmail =async (usuario: IUser, turnoData: ITurno):Promise<void> => {
    try{
       
        const mailOptions={
            from: '"Simpsonzzapi" simpsonzzappi@gmail.com',
            to: "wengoe@gmail.com",
            subject: "Nuevo Turno",
            text: `
 El usuario ${usuario.nombre} ha creado un nuevo turno:
 Dia: ${turnoData.date} Hora: ${turnoData.hour} `
        }
        
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}