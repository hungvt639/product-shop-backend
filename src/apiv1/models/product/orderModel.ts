import mongoose, { Schema, Document, PaginateModel } from "mongoose";
import envV1 from "../../config/_envV1";
import env from "../../../config/env";
import { Color } from "./colorModel";
import { Product } from "./productModel";
import paginate from "mongoose-paginate-v2";

export const StatusOrder = {
    "Đặt đơn": 0,
    "Xác nhận": 1,
    "Đang giao": 2,
    "Đã nhận hàng": 3,
    "Đã hủy": 4,
};

interface OrderProduct {
    product: Product;
    amount: number;
    size: String;
    color: Color;
}

export interface Order extends Document {
    fullname: String;
    phone: String;
    email: String;
    address: String;
    status: Number;
    price: Number;
    orderProduct: OrderProduct[];
    ship: Number;
    note: String;
    noteAdmin: String;
}

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200,
    },
    slug: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    img1: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const ColorSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    code: {
        type: String,
        required: true,
        maxlength: 20,
    },
});

const OrderProductSchema = new Schema({
    product: { type: ProductSchema, required: true },
    amount: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: ColorSchema, required: true },
});

const OrderSchema = new Schema(
    {
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
        status: {
            type: Number,
            default: StatusOrder["Đặt đơn"],
        },
        price: { type: Number, required: false },
        orderProduct: { type: [OrderProductSchema], required: true },
        ship: {
            type: Number,
            default: env.SHIP,
        },
        note: { type: String, default: "" },
        noteAdmin: { type: String, default: "" },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

OrderSchema.plugin(paginate);

const OrderModel = mongoose.model<Order, PaginateModel<Order>>(
    envV1.model.ORDER,
    OrderSchema
);
export default OrderModel;
