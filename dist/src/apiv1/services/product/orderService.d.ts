/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Querys } from "../../interfaces/Express";
import { Order } from "../../models/product/orderModel";
declare class OrderService {
    create(data: any): Promise<Order & {
        _id: any;
    }>;
    gets(options: Querys, filter: Object, sort: string): Promise<import("mongoose").PaginateResult<Order & {
        _id: any;
    }>>;
    update(id: string, { status, noteAdmin }: {
        status: any;
        noteAdmin: any;
    }): Promise<Order & {
        _id: any;
    }>;
    getDetail(id: string): Promise<Order & {
        _id: any;
    }>;
}
declare const _default: OrderService;
export default _default;
