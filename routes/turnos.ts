import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { AdminGetTurnos, createTurno, getHours, getUserTurnos } from "../controllers/turnos";
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



router.post("/adminturnos", [validarJWT, isAdmin, recolectarErrores], AdminGetTurnos);

router.post("/hours",[check("date", "La fecha es obligatoria").not().isEmpty(), recolectarErrores],  getHours);

export default router;