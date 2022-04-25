import mongoose, { Document } from "mongoose";
import { MongoosasticDocument, MongoosasticModel } from "mongoosastic";
import { Type } from "./typeModel";
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
    created_at: string;
    updated_at: string;
}
export declare const ProductSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>;
declare const ProductModel: mongoose.PaginateModel<Product, {}, {}> & MongoosasticModel<Product>;
export default ProductModel;
