import Usuario ,{ IUser} from "../models/usuario" 
import { sendEmail } from "../mailer/mailer";

export const existeEmail = async ( email: string): Promise<void> =>{

    const existeMail: IUser | null = await Usuario.findOne({email});//llamo a la base de datos para que busque si existe algun usuario con ese mail
 
    if(existeMail && existeMail.verified){ // si existe el mail y ya esta verificado respondo con un error
        throw new Error(`El correo ${email} ya está registrado`)
    }

    if(existeMail && !existeMail.verified){// si existe el mail pero no esta verificado mando el mail con el codigo correspondiente
        await sendEmail(email, existeMail.code as string)
        throw new Error(`El usuario ya está registrado. Se envió nuevamente código de verificación a ${email}`)
    }
}