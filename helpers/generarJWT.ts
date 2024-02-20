import jwt from "jsonwebtoken"

const generarJWT = (id: string= ""):Promise<string>=>{
    return new Promise((res, rej)=>{
        const payload = {id} //lo unico que vamos a "encriptar" va a ser el id del usuario

        jwt.sign(
            payload,
            process.env.CLAVESECRETA as string,
            (err: Error | null, token: string | undefined)=>{ //le tenemos que pasar un callback
                if(err){
                    console.log(err)
                    rej("No se pudo generar el token")
                }else{
                    res(token as string)
                }
            }
        )
    })
}

export default generarJWT