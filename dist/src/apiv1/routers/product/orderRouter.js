"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const fnHandler_1 = __importDefault(require("../../middlewares/fnHandler"));
const role_1 = __importDefault(require("../../middlewares/role"));
const _const_1 = require("../_const");
const orderController_1 = __importDefault(require("../../controllers/product/orderController"));
const orderRoute = _const_1.ROUTE.order;
const OrderRouter = (0, express_1.Router)();
OrderRouter.post(orderRoute.create_order, (0, fnHandler_1.default)(orderController_1.default.create));
OrderRouter.get(orderRoute.get_order_detail, (0, fnHandler_1.default)(orderController_1.default.getDetail));
OrderRouter.use(authentication_1.default);
OrderRouter.use(role_1.default);
OrderRouter.get(orderRoute.get_list_order, (0, fnHandler_1.default)(orderController_1.default.gets));
OrderRouter.put(orderRoute.updte_order, (0, fnHandler_1.default)(orderController_1.default.update));
exports.default = OrderRouter;
//# sourceMappingURL=orderRouter.js.map