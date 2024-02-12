import { Router } from "express";
import { check } from "express-validator";
import { existeEmail } from "../helpers/validacionesDB";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { login, register, verifyUser } from "../controllers/auth";


const router = Router();

//creamos la ruta para crear un nuevo usuario

//si la llamada es de tipo post y contiene el el path /register, primero hacemos las validaciones correspondientes, llamo a la funcion recolectarErrores y por ultimo si esta todo OK llamamos al controlador register
router.post("/register",  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("cellphone", "El celular es obligatorio").not().isEmpty(),
    check("location", "La ciudad es obligatoria").not().isEmpty(),
    check("address", "La direccion es obligatoria").not().isEmpty(),
    check("height", "La altura es obligatoria").not().isEmpty(),
    check("weight", "El peso es obligatorio").not().isEmpty(),
    check("experience", "La experiencia es obligatoria").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("email").custom(existeEmail),
    recolectarErrores,
  ], register)




//si la llamada es de tipo patch (actualizacion) y contiene el el path /verify, primero hacemos las validaciones correspondientes, llamo a la funcion recolectarErrores y por ultimo si esta todo OK llamamos al controlador verifyUser  
  router.patch(
    "/verify",
    [
      check("email", "El email es requerido").isEmail(),
      check("code", "El código de verificación es requerido").not().isEmpty(),
      recolectarErrores,
    ],
    verifyUser
  );

  //si la llamada es de tipo post y contiene el el path /login, primero hacemos las validaciones correspondientes, llamo a la funcion recolectarErrores y por ultimo si esta todo OK llamamos al controlador login
  router.post(
    "/login",
    [
      check("email", "El email es requerido").isEmail(),
      check("password", "El password debe ser de 6 caracteres").isLength({
        min: 6,
      }),
      recolectarErrores,
    ],
    login
  );


export default router;