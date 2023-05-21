import { check } from "express-validator";

export const UpdateTodo = [
    check("id")
        .notEmpty().withMessage("id is required")
        .isMongoId().withMessage("invalid todo id"),
    check("title")
        .notEmpty().withMessage("title is required")
        .isString().withMessage("title should be a string"),
    check("details")
        .optional()
        .isString().withMessage("details should be a string"),
]

export const deleteTodo = [
    check("id")
        .notEmpty().withMessage("id is required")
        .isMongoId().withMessage("invalid id")
]