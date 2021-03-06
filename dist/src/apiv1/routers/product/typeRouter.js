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
const typeController_1 = __importDefault(require("../../controllers/product/typeController"));
const typeRoute = _const_1.ROUTE.type;
const TypeRouter = (0, express_1.Router)();
TypeRouter.get(typeRoute.get_product, (0, fnHandler_1.default)(typeController_1.default.getsProducts));
TypeRouter.get(typeRoute.get_type, (0, fnHandler_1.default)(typeController_1.default.get));
TypeRouter.get(typeRoute.get_list_type, (0, fnHandler_1.default)(typeController_1.default.gets));
TypeRouter.use(authentication_1.default);
TypeRouter.use(role_1.default);
TypeRouter.post(typeRoute.create_type, (0, fnHandler_1.default)(typeController_1.default.create));
TypeRouter.put(typeRoute.edit_type, (0, fnHandler_1.default)(typeController_1.default.edit));
TypeRouter.delete(typeRoute.delete_type, (0, fnHandler_1.default)(typeController_1.default.del));
exports.default = TypeRouter;
//# sourceMappingURL=typeRouter.js.map