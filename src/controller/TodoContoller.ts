import { NextFunction, Request, Response } from "express";
import todoModel from "../models/tode";
import CustomError from "../errors/customError";
import mongoose from "mongoose";
import RequestBodyValidationChecker from "../helper/validationChecker"

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await todoModel.find({ user: req?.user?._id })
        res.send({ todo })
    } catch (error) {
        next(error)
    }
}

export const getSingleTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            throw new CustomError("Invalid todo ID", 400)
        const todo = await todoModel.findOne({ _id: req.params.id, user: req?.user?._id })

        if (!todo) throw new CustomError("todo not found", 404)
        res.send({ todo })
    } catch (error) {
        next(error)
    }
}

interface postTodoBody {
    title?: string,
    details?: string,
}

export const postTodo = async (req: Request<any, any, postTodoBody, any>, res: Response, next: NextFunction) => {
    try {
        const { title, details } = req.body
        if (!title) throw new CustomError("title is required", 400)
        const todo = await todoModel.create(({
            title,
            details,
            user: req.user?._id
        }))
        await todo.save()
        res.send(todo)
    } catch (error) {
        next(error)
    }
}

interface Update {
    title?: string,
    details?: string,
}
export const UpdateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        RequestBodyValidationChecker(req)
        const { title, details, id } = req.body;

        let update: Update = {};
        update = {
            title, details
        }
        const todo = await todoModel.findById({ _id: id, user: req.user?._id })
        if (!todo) throw new CustomError("todo Not found", 404);
        todo.title = title ?? todo.title;
        todo.details = details ?? todo.details;
        await todo?.save()
        res.send("todo updated")
    } catch (error) {
        next(error)
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        RequestBodyValidationChecker(req)
        const deletedTodo = await todoModel.findByIdAndDelete(req.body.id)
        if (!deletedTodo) return res.status(422).send("this todo has already been deleted")
        res.status(201).json({ message: "todo deleted", deletedTodo })
    } catch (error) {
        next(error)
    }
}