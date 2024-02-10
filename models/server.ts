import express, {Express} from "express" //expresses la funcion y {Express} es el tipado (para typescript)
import cors from "cors"
import { dbConnection } from "../database/config";
import authRoutes from "../routes/auth"
import turnoRoutes from "../routes/turnos"

export class Server {

    //creamos el tipado de las siguentes variables:
        app: Express;
        port: string | number | undefined
        authPath: string;
        turnoPath: string;
    
    //creamos el costructor que es lo primero que se ejecuta cuando creamos el servidor en app.ts
        constructor(){
            this.app= express() //le asignamos a la variable app lo que trae la funcion express
            this.port = process.env.PORT  //le asignamos el valor de la variable de entorno PORT
            this.authPath = "/auth"
            this.turnoPath = "/turno"
            this.conectarDB()  //llamamos a la funcion que se conecta con la base de datos
            this.middlewares() //llamamos a funcion middlewares
            this.routes(); //llamamos a la funcion routes
        } 
    
    //creamos una funcion que va a llamar a la base de datos:
        async conectarDB(): Promise<void>{
            await dbConnection()
        }
    
    //creamos los middlewares:
        middlewares(): void{
            this.app.use(cors())
            this.app.use(express.json()) //esta funcion me mete los valores del body enviados desde el front en la Request y en formato json
        }
    //creamos las rutas
        routes():void {
            this.app.use(this.authPath, authRoutes)
            this.app.use(this.turnoPath, turnoRoutes)
        }
    //creamos la funcion listen que es la que va a estar escuchando si se llama a la API desde el front (ver que esta funcion no se inicializa en el constructor, la llamo directamente desde app.ts)
        listen(): void{
            this.app.listen(this.port, ()=>{
                console.log(`Corriendo en el puerto ${this.port}`)
            })
        }
    }