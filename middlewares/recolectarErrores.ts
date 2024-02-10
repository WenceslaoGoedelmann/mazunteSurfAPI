import { NextFunction, Request,Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const recolectarErrores = (req: Request, res:Response, next: NextFunction):void =>{
    const errors: Result<ValidationError> = validationResult(req)

    if(!errors.isEmpty()){ //si hay errores le respondo al front con el error
       res.status(400).json(errors) 
    } else {//sino llamo a la funcion next para que continue con el controlador
        next()
    }
}