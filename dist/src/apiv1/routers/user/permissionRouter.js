"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permissionController_1 = __importDefault(require("../../controllers/user/permissionController"));
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const fnHandler_1 = __importDefault(require("../../middlewares/fnHandler"));
const role_1 = __importDefault(require("../../middlewares/role"));
const _const_1 = require("../_const");
const pRoute = _const_1.ROUTE.permission;
const PerRouter = (0, express_1.Router)();
PerRouter.use(authentication_1.default);
PerRouter.use(role_1.default);
PerRouter.post(pRoute.create_per, (0, fnHandler_1.default)(permissionController_1.default.createPermission));
PerRouter.get(pRoute.list_per, (0, fnHandler_1.default)(permissionController_1.default.getListPermission));
PerRouter.put(pRoute.edit_per, (0, fnHandler_1.default)(permissionController_1.default.editPermission));
PerRouter.delete(pRoute.delete_per, (0, fnHandler_1.default)(permissionController_1.default.deletePermission));
PerRouter.get(pRoute.list_url, (0, fnHandler_1.default)(permissionController_1.default.getListUrl));
exports.default = PerRouter;
//# sourceMappingURL=permissionRouter.js.map