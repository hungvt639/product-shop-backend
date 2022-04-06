import { Schema, Document, model } from "mongoose";
import envV1 from "../../config/_envV1";
import env from "../../../config/env";
import { Color, ColorSchema } from "./ColorModel";
import { Product, ProductSchema } from "./productModel";

enum StatusOrder {
    "Đặt đơn" = 0,
    "Xác nhận" = 1,
    "Đang giao" = 2,
    "Đã hủy" = 3,
}

interface OrderProduct extends Document {
    product: Product;
    amount: Number;
    size: string;
    color: Color;
}

export interface Order extends Document {
    fullname: string;
    phone: string;
    email: string;
    address: string;
    status: string;
    price: Number;
    orderProduct: OrderProduct[];
    ship: Number;
    note: string;
    noteAdmin: string;
}

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
            enum: Object.values(StatusOrder),
        },
        price: { type: Number, required: true },
        orderProduct: { type: [OrderProductSchema], required: true },
        ship: {
            type: Number,
            default: env.SHIP,
        },
        note: { type: String },
        noteAdmin: { type: String, default: "" },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const OrderModel = model<Order>(envV1.model.ORDER, OrderSchema);
export default OrderModel;
