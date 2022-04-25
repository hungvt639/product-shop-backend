import mongoose, { Document } from "mongoose";
import { Color } from "./colorModel";
import { Product } from "./productModel";
export declare const StatusOrder: {
    "\u0110\u1EB7t \u0111\u01A1n": number;
    "X\u00E1c nh\u1EADn": number;
    "\u0110ang giao": number;
    "\u0110\u00E3 nh\u1EADn h\u00E0ng": number;
    "\u0110\u00E3 h\u1EE7y": number;
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
declare const OrderModel: mongoose.PaginateModel<Order, {}, {}>;
export default OrderModel;
