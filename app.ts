import { Server } from "./models/server";
import dotenv from "dotenv"

dotenv.config()

//creamos el servidor
const server = new Server()

//llamos a la funcion listen
server.listen()
