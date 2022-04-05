import mongoose, { Schema, SchemaDefinitionProperty, Document } from "mongoose";
import envV1 from "../../config/_envV1";
import mongoosastic, {
    MongoosasticDocument,
    MongoosasticModel,
} from "mongoosastic";
import env from "../../../config/env";

export interface Product extends Document, MongoosasticDocument {
    name: SchemaDefinitionProperty<{
        type: String;
    }>;
    slug: SchemaDefinitionProperty<{
        type: String;
    }>;
    img: SchemaDefinitionProperty<{
        type: String;
    }>;
    img1: SchemaDefinitionProperty<{
        type: String;
    }>;
    image: String[];
    price: SchemaDefinitionProperty<{
        type: Number;
    }>;
    sizes: String[];
    colors: String[];
    type: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    description?: String;
    information?: String;
    sold: Number;
    // constructor(
    //     name: string,
    //     img: string,
    //     img1?: string,
    //     images?: String[],
    //     sizes?: string[],
    //     colors?: string[],
    //     description?: string,
    //     information?: string,
    //     sold?: number
    // ) {
    //     this.name = name;
    //     this.img = img;
    //     this.img1 = img1 ?? "";
    //     this.images = images ?? [];
    //     this.sizes = sizes ?? [];
    //     this.colors = colors ?? [];
    //     this.description = description ?? "";
    //     this.information = information ?? "";
    //     this.sold = sold ?? 0;
    // }
}

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
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
        colors: [{ type: String, ref: envV1.model.COLOR }],
        type: { type: String, ref: envV1.model.TYPE, es_indexed: true },

        description: String,
        information: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
ProductSchema.plugin(mongoosastic, {
    index: envV1.model.PRODUCT,
    clientOptions: {
        nodes: [env.ECONNREFUSED],
    },
});
const ProductModel = mongoose.model<Product, MongoosasticModel<Product>>(
    envV1.model.PRODUCT,
    ProductSchema
);
export default ProductModel;
