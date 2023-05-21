import { check } from "express-validator";
import CustomError from "../errors/customError";

export const signUp = [
    check("fullName")
        .notEmpty().withMessage("fullName Required")
        .isString().withMessage("fullName should be a string")
        .isLength({ min: 3 }).withMessage("fullName can not be less than 3 characters"),
    check('email')
        .isEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .isAlphanumeric().withMessage("password should be alpha numberic"),
    check("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new CustomError("Passwords do not match", 400)
            return true
        })
]

export const login = [
    check('email')
        .isEmail().withMessage('Invalid email'),
    check('password')
        .notEmpty().withMessage("Password Required"),
]