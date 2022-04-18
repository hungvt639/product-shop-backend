import mongoose, { Schema } from "mongoose";
import envV1 from "../../config/_envV1";
import slug from "mongoose-slug-generator";

export class Size {
    name: String;

    constructor(name: string) {
        this.name = name;
    }
}
mongoose.plugin(slug);

const SizeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        slug: {
            type: String,
            slug: "name",
            unique: true,
            slug_padding_size: 4,
        },
    },
    { timestamps: false }
);

const SizeModel = mongoose.model<Size>(envV1.model.SIZE, SizeSchema);
export default SizeModel;
