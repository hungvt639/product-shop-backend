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
const groupController_1 = __importDefault(require("../../controllers/user/groupController"));
const grRoute = _const_1.ROUTE.group;
const GrRouter = (0, express_1.Router)();
GrRouter.use(authentication_1.default);
GrRouter.use(role_1.default);
GrRouter.get(grRoute.get_groups, (0, fnHandler_1.default)(groupController_1.default.getGroups));
GrRouter.post(grRoute.create_group, (0, fnHandler_1.default)(groupController_1.default.createGroup));
GrRouter.delete(grRoute.delete_group, (0, fnHandler_1.default)(groupController_1.default.deleteGroup));
GrRouter.put(grRoute.update_permission_in_group, (0, fnHandler_1.default)(groupController_1.default.permissionOfGroup));
exports.default = GrRouter;
//# sourceMappingURL=groupRouter.js.map