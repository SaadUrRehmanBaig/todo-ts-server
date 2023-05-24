import { check } from "express-validator";

export const getAllTodo = [
    check("limit").isInt({ min: 1 }).withMessage("limit must be an integer with min value of 1"),
    check("page").isInt({ min: 1 }).withMessage("page must be an integer with min value of 1")
]


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