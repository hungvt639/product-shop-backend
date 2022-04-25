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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../config/env"));
const userModel_1 = __importDefault(require("../../models/user/userModel"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const groupModel_1 = __importDefault(require("../../models/user/groupModel"));
const data_1 = require("../../_data/data");
const _envV1_1 = __importDefault(require("../../config/_envV1"));
class UserService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield groupModel_1.default.findOne({ name: data_1.GROUP.user.name });
            if (!group)
                throw new Error("Không tìm thấy group " + data_1.GROUP.user.name);
            const user = yield userModel_1.default.create(data);
            user.groups.push(group._id);
            const token = jsonwebtoken_1.default.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.fullname,
            }, env_1.default.SECRET_ACTIVATE_USER, { expiresIn: "7d" });
            yield (0, sendEmail_1.default)({
                to: data.email,
                subject: "Kích hoạt tài khoản!",
                template: "activate-user",
                context: {
                    fullname: data.fullname,
                    href: `${env_1.default.FRONTEND}/${_envV1_1.default.r.activate_user}?${_envV1_1.default.query.active_token}=${token}`,
                },
            });
            yield user.save();
            user.password = "";
            return user;
        });
    }
    activateUser(active_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jsonwebtoken_1.default.verify(active_token, env_1.default.SECRET_ACTIVATE_USER);
            const user = yield userModel_1.default.findByIdAndUpdate(payload._id, { isActivate: true }, { new: true }).select("_id");
            if (!user)
                throw new Error("User không tồn tại");
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({
                username: username,
            }, "_id email username password fullname avatar permission isActivate");
            if (!user) {
                throw new Error("Sai tên tài khoản hoặc mật khẩu!");
            }
            if (!user.isActivate) {
                throw new Error("Tài khoản chưa được kích hoạt");
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                throw new Error("Sai tên tài khoản hoặc mật khẩu!");
            }
            const token = jsonwebtoken_1.default.sign({
                _id: user._id,
                username: user.username,
                name: user.fullname,
            }, env_1.default.SECRET);
            user.password = "";
            return {
                token: token,
                user: user,
                message: "ok",
            };
        });
    }
    getListUser(filter, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_1.default.find(filter, select);
            return users;
        });
    }
    getUser(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userModel_1.default.findById(id, select);
            if (select.includes("groups")) {
                user = yield user.populate({
                    path: "groups",
                    populate: { path: "permissions" },
                });
            }
            return user;
        });
    }
    editProfile(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findByIdAndUpdate(_id, update, {
                new: true,
            });
        });
    }
    changePassword(_id, password, oldPassword, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield bcrypt_1.default.compare(oldPassword, pass);
            if (!match) {
                throw new Error("Mật khẩu cũ không khớp");
            }
            const salt = bcrypt_1.default.genSaltSync(10);
            const newPassword = bcrypt_1.default.hashSync(password, salt);
            yield userModel_1.default.findByIdAndUpdate(_id, {
                password: newPassword,
            });
        });
    }
    sendResetPassword(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ $or: [{ username: param }, { email: param }] }, "_id username email fullname");
            if (!user)
                throw new Error("Không tìm thấy tài khoản nào có username hoặc email là " +
                    param);
            const now = Date.now();
            const token = jsonwebtoken_1.default.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.fullname,
                time: now,
            }, env_1.default.SECRET_RESET_PASSWORD, { expiresIn: "5m" });
            yield (0, sendEmail_1.default)({
                to: user.email,
                subject: "Khôi phục mật khẩu!",
                template: "reset-password",
                context: {
                    fullname: user.fullname,
                    href: `${env_1.default.FRONTEND}/${_envV1_1.default.r.reset_password}?${_envV1_1.default.query.reset_password_token}=${token}`,
                },
            });
            user.timeResetPassword = now;
            yield user.save();
        });
    }
    resetPassword(password, reset_password_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jsonwebtoken_1.default.verify(reset_password_token, env_1.default.SECRET_RESET_PASSWORD);
            const user = yield userModel_1.default.findById(payload._id, "_id password timeResetPassword");
            if (!user)
                throw new Error("Không tìm thấy người dùng");
            if (user.timeResetPassword !== payload.time)
                throw new Error("Vui lòng cung cấp token mới nhất");
            const salt = bcrypt_1.default.genSaltSync(10);
            user.password = bcrypt_1.default.hashSync(password, salt);
            user.timeResetPassword = 0;
            yield user.save();
        });
    }
    updateGroupUser(id, groups) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findById(id, "_id fullname username groups");
            if (!user)
                throw new Error("Không tìm thấy người dùng nào có id là: " + id);
            const grs = yield groupModel_1.default.find({
                _id: { $in: groups },
            });
            if (grs.length !== groups.length) {
                const grErr = groups.filter((gr) => !grs.filter((g) => g._id == gr).length);
                throw new Error(`Không tìm thấy Group có id là ${grErr}`);
            }
            const grIds = grs.map((p) => p._id);
            user.groups = grIds;
            yield user.save();
            const u = yield user.populate({
                path: "groups",
                populate: { path: "permissions" },
            });
            return u;
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map