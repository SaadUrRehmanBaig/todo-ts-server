import mongoose from "mongoose"

declare module "express-session" {
    interface SessionData {
        user: mongoose.Types.ObjectId
    }
}