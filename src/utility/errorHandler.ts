import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let errorMessage = "unknow error Occured"
    let statusCode = 500
    if (error instanceof CustomError) {
        errorMessage = error.message
        statusCode = error.statusCode
    }
    res.status(statusCode).send({ error: errorMessage })
}

export default errorHandler