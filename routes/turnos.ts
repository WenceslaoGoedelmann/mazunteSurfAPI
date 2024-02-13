import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { createTurno, getAllTurnos, getHours, getUserTurnos } from "../controllers/turnos";
import { isAdmin } from "../middlewares/validarRol";

const router = Router();

router.get("/", [validarJWT, recolectarErrores], getUserTurnos);

router.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("date", "La fecha es obligatoria").not().isEmpty(),
    check("hour", "La hora es obligatoria").not().isEmpty(),
    recolectarErrores,
  ],
  createTurno
);

router.get("/allturnos", [validarJWT, isAdmin, recolectarErrores], getAllTurnos);

router.post("/hours",[check("date", "La fecha es obligatoria").not().isEmpty(), recolectarErrores],  getHours);

export default router;