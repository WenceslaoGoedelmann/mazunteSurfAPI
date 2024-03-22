import express, {Express} from "express" //expresses la funcion y {Express} es el tipado (para typescript)
import cors from "cors"
import { dbConnection } from "../database/config";
import authRoutes from "../routes/auth"
import turnoRoutes from "../routes/turnos"

export class Server {

    
        app: Express;
        port: string | number | undefined
        authPath: string;
        turnoPath: string;
    
    
        constructor(){
            this.app= express() 
            this.port = process.env.PORT  
            this.authPath = "/auth"
            this.turnoPath = "/turno"
            this.conectarDB() 
            this.middlewares() 
            this.routes(); 
        } 
    
   
        async conectarDB(): Promise<void>{
            await dbConnection()
        }
    
   
        middlewares(): void{
            this.app.use(cors())
            this.app.use(express.json()) 
        }
    
        routes():void {
            this.app.use(this.authPath, authRoutes)
            this.app.use(this.turnoPath, turnoRoutes)
        }

        listen(): void{
            this.app.listen(this.port, ()=>{
                console.log(`Corriendo en el puerto ${this.port}`)
            })
        }
    }