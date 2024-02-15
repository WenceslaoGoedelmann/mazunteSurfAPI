import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { AdminGetTurnos, createTurno, deleteTurno, getHours, getUserTurnos, statusTurno } from "../controllers/turnos";
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

router.delete("/deleteturno", [validarJWT, recolectarErrores], deleteTurno);


router.post("/adminturnos", [validarJWT, isAdmin, recolectarErrores], AdminGetTurnos);
router.patch("/adminturnos", [validarJWT, isAdmin, recolectarErrores], statusTurno);

router.post("/hours",[check("date", "La fecha es obligatoria").not().isEmpty(), recolectarErrores],  getHours);

export default router;