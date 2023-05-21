import { Request } from "express";
import { validationResult } from "express-validator";
import CustomError from "../errors/customError";

function RequestBodyValidationChecker(req: Request) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new CustomError(errors.array()[0].msg, 400)
    }
}

export default RequestBodyValidationChecker