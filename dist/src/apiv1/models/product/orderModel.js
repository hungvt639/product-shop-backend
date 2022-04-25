"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusOrder = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
const env_1 = __importDefault(require("../../../config/env"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.StatusOrder = {
    "Đặt đơn": 0,
    "Xác nhận": 1,
    "Đang giao": 2,
    "Đã nhận hàng": 3,
    "Đã hủy": 4,
};
const ProductSchema = new mongoose_1.Schema({
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
const ColorSchema = new mongoose_1.Schema({
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
const OrderProductSchema = new mongoose_1.Schema({
    product: { type: ProductSchema, required: true },
    amount: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: ColorSchema, required: true },
});
const OrderSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    status: {
        type: Number,
        default: exports.StatusOrder["Đặt đơn"],
    },
    price: { type: Number, required: false },
    orderProduct: { type: [OrderProductSchema], required: true },
    ship: {
        type: Number,
        default: env_1.default.SHIP,
    },
    note: { type: String, default: "" },
    noteAdmin: { type: String, default: "" },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
OrderSchema.plugin(mongoose_paginate_v2_1.default);
const OrderModel = mongoose_1.default.model(_envV1_1.default.model.ORDER, OrderSchema);
exports.default = OrderModel;
//# sourceMappingURL=orderModel.js.map