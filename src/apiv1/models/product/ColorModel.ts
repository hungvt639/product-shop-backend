import mongoose, { Schema } from "mongoose";
import envV1 from "../../config/_envV1";

export class Color {
    name: String;
    code: String;
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}

export const ColorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
        code: {
            type: String,
            required: true,
            maxlength: 20,
        },
    },
    { timestamps: false }
);

const ColorModel = mongoose.model<Color>(envV1.model.COLOR, ColorSchema);
export default ColorModel;
