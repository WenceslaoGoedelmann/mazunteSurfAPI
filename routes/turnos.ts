import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { createTurno, getAllTurnos, getHours, getTurnos } from "../controllers/turnos";
import { isAdmin } from "../middlewares/validarRol";

const router = Router();

router.get("/", [validarJWT, recolectarErrores], getTurnos);

router.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("date", "La fecha es obligatoria").not().isEmpty(),
    check("hour", "La hora es obligatoria").not().isEmpty(),
    check("altura", "La altura es obligatoria").not().isEmpty(),
    check("peso", "El peso es obligatorio").not().isEmpty(),
    check("experience", "La experiencia es obligatoria").not().isEmpty(),
    recolectarErrores,
  ],
  createTurno
);

router.get("/allturnos", [validarJWT, isAdmin, recolectarErrores], getAllTurnos);

router.post("/hours",  getHours);

/* [check("date", "La fecha es obligatoria").not().isEmpty(), recolectarErrores] */

export default router;