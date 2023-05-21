import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

type todo = InferSchemaType<typeof todoSchema>

export default model<todo>("Todo", todoSchema)