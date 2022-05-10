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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../../config/env"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
const orderModel_1 = __importStar(require("../../models/product/orderModel"));
const productModel_1 = __importDefault(require("../../models/product/productModel"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
class OrderService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield Promise.all(data.orderProducts.map((op) => __awaiter(this, void 0, void 0, function* () {
                const product = yield productModel_1.default.findOne({ _id: op.product_id, isSale: true }, "_id name slug img img1 price sizes colors type").populate({ path: "type", select: "name" });
                if (!product)
                    throw new Error("Đơn hàng có chứa sản phầm không còn được bán");
                const type = product.type;
                const proOrder = Object.assign(Object.assign({}, op), { product: Object.assign(Object.assign({}, product.toJSON()), { type: type.name }) });
                delete proOrder["product_id"];
                return proOrder;
            })));
            const price = orderProduct.reduce((a, b) => a + b.product.price * b.amount, 0) +
                env_1.default.SHIP;
            const order = yield orderModel_1.default.create(Object.assign(Object.assign({}, data), { price, orderProduct }));
            if (order.email) {
                try {
                    yield (0, sendEmail_1.default)({
                        to: data.email,
                        subject: `Đặt đơn shop ${env_1.default.SHOP_NAME}`,
                        template: "order",
                        context: {
                            message: "Đơn hàng của bạn đã được đặt thành công",
                            href: `${env_1.default.FRONTEND}/${_envV1_1.default.r.order_detail}/${order._id}`,
                        },
                    });
                }
                catch (_a) { }
            }
            yield order.save();
            return order;
        });
    }
    gets(options, filter, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderModel_1.default.paginate(filter, Object.assign(Object.assign({}, options), { sort }));
        });
    }
    update(id, { status, noteAdmin }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderModel_1.default.findById(id);
            if (!order)
                throw new Error("Không tìm thấy đơn hàng có id là: " + id);
            if (status) {
                let isPlus = 0;
                if (order.status === orderModel_1.StatusOrder["Đã nhận hàng"] &&
                    status !== order.status)
                    isPlus = -1;
                if (order.status !== orderModel_1.StatusOrder["Đã nhận hàng"] &&
                    status === orderModel_1.StatusOrder["Đã nhận hàng"])
                    isPlus = 1;
                if (isPlus) {
                    yield Promise.all(order.orderProduct.map((op) => __awaiter(this, void 0, void 0, function* () {
                        const product = yield productModel_1.default.findById(op.product._id);
                        product.sold += isPlus * op.amount;
                        yield product.save();
                    })));
                }
                if (order.email) {
                    try {
                        yield (0, sendEmail_1.default)({
                            to: order.email,
                            subject: `Đặt đơn shop ${env_1.default.SHOP_NAME}`,
                            template: "order",
                            context: {
                                message: "Đơn hàng của bạn đã được cập nhật",
                                href: `${env_1.default.FRONTEND}/${_envV1_1.default.r.order_detail}/${order._id}`,
                            },
                        });
                    }
                    catch (_a) { }
                }
                order.status = status;
            }
            if (noteAdmin)
                order.noteAdmin = noteAdmin;
            yield order.save();
            return order;
        });
    }
    getDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield orderModel_1.default.findById(id);
            if (!data)
                throw new Error("Không tìm thấy đơn hàng có id là: " + id);
            return data;
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map