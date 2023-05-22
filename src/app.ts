import "dotenv/config"
import express, { Express } from "express";
import errorHandler from "./utility/errorHandler";
import routes from "./routes";
import morgan from "morgan";
import CustomError from "./errors/customError";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import uploadMiddleware from "./middleware/uploadMiddleware";
import path from "path";

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
app.use(uploadMiddleware)

//For Uploads
const __dirname1 = path.resolve();
console.log(__dirname1);
app.use("/uploads", express.static(path.join(__dirname1, "/uploads")));

app.get("/", (req, res) => {
    res.send("Todo server running")
})

routes(app)

app.use("*", (req, res, next) => {
    next(new CustomError("Endpoint Not found", 404))
});

app.use(errorHandler);

export default app 