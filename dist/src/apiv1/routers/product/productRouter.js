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
const productController_1 = __importDefault(require("../../controllers/product/productController"));
const pRoute = _const_1.ROUTE.product;
const ProductRouter = (0, express_1.Router)();
ProductRouter.get(pRoute.search_product, (0, fnHandler_1.default)(productController_1.default.search));
ProductRouter.get(pRoute.get_product_sale, (0, fnHandler_1.default)(productController_1.default.gets_sale));
ProductRouter.get(pRoute.get_product, (0, fnHandler_1.default)(productController_1.default.get));
ProductRouter.get(pRoute.get_list_product, (0, fnHandler_1.default)(productController_1.default.gets));
ProductRouter.use(authentication_1.default);
ProductRouter.use(role_1.default);
ProductRouter.post(pRoute.create_product, (0, fnHandler_1.default)(productController_1.default.create));
ProductRouter.put(pRoute.edit_product, (0, fnHandler_1.default)(productController_1.default.edit));
ProductRouter.delete(pRoute.delete_product, (0, fnHandler_1.default)(productController_1.default.del));
exports.default = ProductRouter;
//# sourceMappingURL=productRouter.js.map