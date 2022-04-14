import mongoose, { Schema, Document, model, PaginateModel } from "mongoose";
import envV1 from "../../config/_envV1";
import mongoosastic, {
    MongoosasticDocument,
    MongoosasticModel,
} from "mongoosastic";
import slug from "mongoose-slug-generator";
import env from "../../../config/env";
import { Type } from "./typeModel";
import paginate from "mongoose-paginate-v2";

export interface Product extends Document, MongoosasticDocument {
    name: String;
    slug: String;
    img: String;
    img1: String;
    image: String[];
    price: number;
    sizes: String[];
    colors: String[];
    type: String | Type;
    isSale: Boolean;
    description?: String;
    information?: String;
    sold: number;
}

mongoose.plugin(slug);

export const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 200,
            es_indexed: true,
        },
        slug: {
            type: String,
            slug: "name",
            unique: true,
            slug_padding_size: 4,
            es_indexed: true,
        },
        img: {
            type: String,
            es_indexed: true,
        },
        img1: {
            type: String,
            es_indexed: true,
        },
        image: [String],
        price: {
            type: Number,
            es_indexed: true,
        },
        sizes: [String],
        colors: [
            {
                type: String,
                ref: envV1.model.COLOR,
            },
        ],
        type: {
            type: String,
            ref: envV1.model.TYPE,
            es_indexed: true,
            es_include_in_parent: true,
        },
        isSale: {
            type: Boolean,
            default: true,
            es_indexed: true,
        },
        description: String,
        information: String,
        sold: {
            type: Number,
            es_indexed: true,
            default: 0,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ProductSchema.plugin(paginate);

ProductSchema.plugin(mongoosastic, {
    populate: [{ path: "type" }],
    index: envV1.model.PRODUCT,
    clientOptions: {
        nodes: [env.ECONNREFUSED],
    },
});
const ProductModel = model<
    Product,
    PaginateModel<Product>,
    MongoosasticModel<Product>
>(envV1.model.PRODUCT, ProductSchema);
export default ProductModel;
