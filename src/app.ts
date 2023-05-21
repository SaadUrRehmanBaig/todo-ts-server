import "dotenv/config"
import express, { Express } from "express";
import errorHandler from "./utility/errorHandler";
import routes from "./routes";
import morgan from "morgan";
import CustomError from "./errors/customError";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors"

const app: Express = express()

app.use(cors())
app.use(session({
    secret: 'ljfnvlisfn6867##*Y&*Y*bvu&^%^$9876kjdshbvsek',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: { maxAge: 60 * 60 * 1000 }, //30 * 24 * 60 * 60 * 1000
    store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING })
}))
app.use(morgan("dev"))
app.use(express.json())

routes(app)

app.get("/", (req, res) => {
    res.send("Todo server running")
})
app.use("*", (req, res, next) => {
    next(new CustomError("Endpoint Not found", 404))
});

app.use(errorHandler);

export default app 