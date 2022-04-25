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
const sizeController_1 = __importDefault(require("../../controllers/product/sizeController"));
const sizeRoute = _const_1.ROUTE.size;
const SizeRouter = (0, express_1.Router)();
SizeRouter.use(authentication_1.default);
SizeRouter.use(role_1.default);
SizeRouter.get(sizeRoute.get_list_size, (0, fnHandler_1.default)(sizeController_1.default.gets));
SizeRouter.post(sizeRoute.create_size, (0, fnHandler_1.default)(sizeController_1.default.create));
SizeRouter.delete(sizeRoute.delete_size, (0, fnHandler_1.default)(sizeController_1.default.del));
exports.default = SizeRouter;
//# sourceMappingURL=sizeRouter.js.map