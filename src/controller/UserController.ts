import { Request, RequestHandler } from "express";
import CustomError from "../errors/customError";
import RequestBodyValidationChecker from "../helper/validationChecker";
import User from "../models/user";
import bcrypt from "bcrypt"

interface signUpBody {
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string
}

export const signUp: RequestHandler = async (req: Request<any, any, signUpBody, any>, res, next) => {
    try {
        RequestBodyValidationChecker(req)
        const { email, password, fullName, confirmPassword } = req.body
        const user = await User.findOne({ email })

        if (user) throw new CustomError("email already exists", 400)

        if (password !== confirmPassword) throw new CustomError("password do not match", 400)

        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(password, salt);

        const imagesPath: any = req.files

        await User.create({
            email,
            password: hashedPassword,
            fullName,
            image: imagesPath && imagesPath.user_image && imagesPath.user_image[0] && imagesPath?.user_image[0]?.path
        });

        res.status(201).send("new user created!!! proceed to login");
    } catch (error) {
        next(error)
    }
}

interface loginBody {
    email: string,
    password: string,
}

export const login: RequestHandler = async (req: Request<any, any, loginBody, any>, res, next) => {
    try {
        RequestBodyValidationChecker(req)
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password")

        if (!user) throw new CustomError("No User Found", 400)

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw new CustomError('Credentials incorrect', 400);
        }

        req.session.user = user.id;

        res.status(201).send("Login Successfull");
    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) throw new Error(err);
            res.json({ message: 'Logout successful' });
        })
    } catch (error) {
        next(error)
    }

}