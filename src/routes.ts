import { Express } from "express";
import todoRouter from "./Routes/todo";
import userRouter from "./Routes/user";

function routes(app: Express) {
    app.use("/api/todo", todoRouter)
    app.use("/api/user", userRouter)
}

export default routes