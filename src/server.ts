import app from "./app"
import mongoose from "mongoose";
import env from "./utility/ValidateEnv"


const port = env.PORT

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Database connected")
    app.listen(port, () => {
        console.log("running on port", port)
    })
}).catch((error) => {
    console.error(error)
})



