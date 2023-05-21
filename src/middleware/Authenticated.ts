import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

function AuthenticationFunction(req: Request, res: Response, next: NextFunction) {
    if (req.session.user && mongoose.isValidObjectId(req.session.user)) {
        req.user = {
            _id: req.session.user
        };
        next()
    }
    else {
        res.status(403).json({ error: "Not Authorised" });
    }
}

export default AuthenticationFunction