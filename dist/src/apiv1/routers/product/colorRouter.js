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
const colorController_1 = __importDefault(require("../../controllers/product/colorController"));
const colorRoute = _const_1.ROUTE.color;
const ColorRouter = (0, express_1.Router)();
ColorRouter.use(authentication_1.default);
ColorRouter.use(role_1.default);
ColorRouter.get(colorRoute.get_list_color, (0, fnHandler_1.default)(colorController_1.default.gets));
ColorRouter.post(colorRoute.create_color, (0, fnHandler_1.default)(colorController_1.default.create));
ColorRouter.put(colorRoute.edit_color, (0, fnHandler_1.default)(colorController_1.default.edit));
ColorRouter.delete(colorRoute.delete_color, (0, fnHandler_1.default)(colorController_1.default.del));
exports.default = ColorRouter;
//# sourceMappingURL=colorRouter.js.map