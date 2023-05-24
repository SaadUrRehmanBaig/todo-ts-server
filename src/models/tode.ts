import mongoose, { InferSchemaType, Schema, model } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

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

todoSchema.plugin(mongoosePagination)

type todo = InferSchemaType<typeof todoSchema>

export default model<todo, Pagination<todo>>("Todo", todoSchema)