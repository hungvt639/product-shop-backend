import mongoose, { Schema, Document } from "mongoose";
import envV1 from "../../config/_envV1";
import env from "../../../config/env";
import { Color, ColorSchema } from "./colorModel";
import { Product, ProductSchema } from "./productModel";

const StatusOrder = {
    "Đặt đơn": 0,
    "Xác nhận": 1,
    "Đang giao": 2,
    "Đã hủy": 3,
};

interface OrderProduct extends Document {
    product: Object;
    amount: Number;
    size: String;
    color: Color;
}

export interface Order {
    fullname: String;
    phone: String;
    email: String;
    address: String;
    status: String;
    price: Number;
    orderProduct: OrderProduct[];
    ship: Number;
    note: String;
    noteAdmin: String;
}

const OrderProductSchema = new Schema({
    product: { type: Object, required: true },
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
        note: String,
        noteAdmin: { type: String, default: "" },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const OrderModel = mongoose.model<Order & Document>(
    envV1.model.ORDER,
    OrderSchema
);
export default OrderModel;
