import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    fullName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }

}, { timestamps: true })

type userSchemaType = mongoose.InferSchemaType<typeof UserSchema>

const userModel = mongoose.model<userSchemaType>("User", UserSchema)

export default userModel