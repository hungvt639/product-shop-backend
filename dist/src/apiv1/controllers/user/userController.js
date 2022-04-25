"use strict";
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
const response_1 = __importDefault(require("../../utils/response"));
const functions_1 = __importDefault(require("../../utils/functions"));
const userModel_1 = require("../../models/user/userModel");
const userService_1 = __importDefault(require("../../services/user/userService"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new userModel_1.User(req.body);
            const user = yield userService_1.default.register(data);
            response_1.default.ok(res, user);
        });
    }
    activateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { active_token } = req.body;
            if (!active_token)
                return response_1.default.badRequest(res, "Vui lòng cung cấp token");
            yield userService_1.default.activateUser(active_token);
            response_1.default.ok(res, { message: "Kích hoạt tài khoản thành công" });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                return response_1.default.badRequest(res, "Vui lòng điền đầy đủ tài khoản mật khẩu");
            }
            const value = yield userService_1.default.login(username, password);
            response_1.default.ok(res, value);
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            response_1.default.ok(res, req.user);
        });
    }
    getListUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const select = req.query.select || "_id fullname username";
            let filter = functions_1.default.removeKeyNull(req.query);
            const users = yield userService_1.default.getListUser(filter, select);
            response_1.default.ok(res, users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const select = req.query.select || "_id fullname username";
            const user = yield userService_1.default.getUser(id, select);
            response_1.default.ok(res, user);
        });
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, avatar } = req.body;
            const update = functions_1.default.removeKeyNull({ fullname, avatar });
            const user = yield userService_1.default.editProfile(req.user._id, update);
            response_1.default.ok(res, user);
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, oldPassword } = req.body;
            const { user } = req;
            if (!password) {
                return response_1.default.badRequest(res, "Mật khẩu không được để trống");
            }
            yield userService_1.default.changePassword(user._id, password, oldPassword, user.password);
            response_1.default.ok(res, { message: "Thay đổi mật khẩu thành công" });
        });
    }
    sendResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { param } = req.body;
            if (!param)
                return response_1.default.badRequest(res, "Vui lòng nhập username hoặc email của bạn");
            yield userService_1.default.sendResetPassword(param);
            response_1.default.ok(res, {
                message: "Một tin nhắn đã được gửi tới email của bạn. Vui lòng kiểm tra email và tiến hành cập nhật lại mật khẩu",
            });
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, reset_password_token } = req.body;
            if (!password)
                return response_1.default.badRequest(res, "Vui lòng nhập mật khẩu mới");
            yield userService_1.default.resetPassword(password, reset_password_token);
            response_1.default.ok(res, {
                message: "Thay đổi mật khẩu thành công",
            });
        });
    }
    updateGroupUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { groups } = req.body;
            const { id } = req.params;
            if (!functions_1.default.validArrObjId(groups)) {
                return response_1.default.badRequest(res, "groups không đúng định dạng ObjectId");
            }
            const user = yield userService_1.default.updateGroupUser(id, groups);
            response_1.default.ok(res, user);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map