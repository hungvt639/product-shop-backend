import mongoose, { Schema } from "mongoose";
import envV1 from "../../config/_envV1";

export class Size {
    name: String;

    constructor(name: string) {
        this.name = name;
    }
}

const SizeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
    },
    { timestamps: false }
);

const SizeModel = mongoose.model<Size>(envV1.model.SIZE, SizeSchema);
export default SizeModel;
