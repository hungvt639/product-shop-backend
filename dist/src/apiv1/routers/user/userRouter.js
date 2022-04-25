"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../../controllers/user/userController"));
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const fnHandler_1 = __importDefault(require("../../middlewares/fnHandler"));
const role_1 = __importDefault(require("../../middlewares/role"));
const _const_1 = require("../_const");
const uRoute = _const_1.ROUTE.user;
const UserRouter = (0, express_1.Router)();
UserRouter.post(uRoute.register, (0, fnHandler_1.default)(userController_1.default.register));
UserRouter.post(uRoute.activate_user, (0, fnHandler_1.default)(userController_1.default.activateUser));
UserRouter.post(uRoute.login, (0, fnHandler_1.default)(userController_1.default.login));
UserRouter.get(uRoute.get_profile, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.getProfile));
UserRouter.get(uRoute.get_list_users, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.getListUser));
UserRouter.get(uRoute.get_user, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.getUser));
UserRouter.put(uRoute.edit_profile, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.editProfile));
UserRouter.put(uRoute.change_password, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.changePassword));
UserRouter.post(uRoute.send_reset_password, (0, fnHandler_1.default)(userController_1.default.sendResetPassword));
UserRouter.post(uRoute.reset_password, (0, fnHandler_1.default)(userController_1.default.resetPassword));
UserRouter.put(uRoute.update_group_for_user, authentication_1.default, role_1.default, (0, fnHandler_1.default)(userController_1.default.updateGroupUser));
exports.default = UserRouter;
//# sourceMappingURL=userRouter.js.map