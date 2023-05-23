import { Request, RequestHandler } from "express";
import CustomError from "../errors/customError";
import RequestBodyValidationChecker from "../helper/validationChecker";
import User from "../models/user";
import bcrypt from "bcrypt"
import { DeleteFile } from "../helper/Deletefile";

interface signUpBody {
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string
}

export const signUp: RequestHandler = async (req: Request<any, any, signUpBody, any>, res, next) => {
    try {
        RequestBodyValidationChecker(req)
        const { password, fullName, confirmPassword } = req.body
        const email = req.body.email.toLowerCase();
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
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
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

export const getProfile: RequestHandler = async (req: Request, res, next) => {
    try {
        const user = await User.findById(req.user?._id);
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }

}

export const editProfile: RequestHandler = async (req: Request, res, next) => {
    try {
        let password;
        const user: any = await User.findById(req.user?._id).select("+password");
        user.fullName = req.body.fullName ?? user?.fullName
        let imagesPath: any = req.files
        imagesPath = imagesPath && imagesPath.user_image && imagesPath.user_image[0] && imagesPath?.user_image[0]?.path;
        if (req.body.password && req.body.confirmPassword) {
            if (req.body.password !== req.body.confirmPassword) throw new CustomError("password do not match", 400)

            if (bcrypt.compareSync(req.body.password, user.password)) throw new CustomError("new password can not be same as old", 400)
            const salt = bcrypt.genSaltSync(10)
            password = bcrypt.hashSync(req.body.password, salt);
            user.password = password;
        }
        imagesPath && user.image ? DeleteFile([user?.image]) : null;
        user.image = imagesPath ?? user?.image;
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        let imagesPath: any = req.files
        imagesPath = imagesPath && imagesPath.user_image && imagesPath.user_image[0] && imagesPath?.user_image[0]?.path;
        if (imagesPath) DeleteFile([imagesPath])
        next(error)
    }

}