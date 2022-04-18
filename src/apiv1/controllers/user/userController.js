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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var response_1 = require("../../utils/response");
var functions_1 = require("../../utils/functions");
var userModel_1 = require("../../models/user/userModel");
var userService_1 = require("../../services/user/userService");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = new userModel_1.User(req.body);
                        return [4 /*yield*/, userService_1["default"].register(data)];
                    case 1:
                        user = _a.sent();
                        response_1["default"].ok(res, user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.activateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var active_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        active_token = req.body.active_token;
                        if (!active_token)
                            return [2 /*return*/, response_1["default"].badRequest(res, "Vui lòng cung cấp token")];
                        return [4 /*yield*/, userService_1["default"].activateUser(active_token)];
                    case 1:
                        _a.sent();
                        response_1["default"].ok(res, { message: "Kích hoạt tài khoản thành công" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        if (!username || !password) {
                            return [2 /*return*/, response_1["default"].badRequest(res, "Vui lòng điền đầy đủ tài khoản mật khẩu")];
                        }
                        return [4 /*yield*/, userService_1["default"].login(username, password)];
                    case 1:
                        value = _b.sent();
                        response_1["default"].ok(res, value);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response_1["default"].ok(res, req.user);
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getListUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var select, filter, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = req.query.select || "_id fullname username";
                        filter = functions_1["default"].removeKeyNull(req.query);
                        return [4 /*yield*/, userService_1["default"].getListUser(filter, select)];
                    case 1:
                        users = _a.sent();
                        response_1["default"].ok(res, users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, select, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        select = req.query.select || "_id fullname username";
                        return [4 /*yield*/, userService_1["default"].getUser(id, select)];
                    case 1:
                        user = _a.sent();
                        response_1["default"].ok(res, user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.editProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fullname, avatar, update, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, fullname = _a.fullname, avatar = _a.avatar;
                        update = functions_1["default"].removeKeyNull({ fullname: fullname, avatar: avatar });
                        return [4 /*yield*/, userService_1["default"].editProfile(req.user._id, update)];
                    case 1:
                        user = _b.sent();
                        response_1["default"].ok(res, user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.changePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, oldPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, oldPassword = _a.oldPassword;
                        user = req.user;
                        if (!password) {
                            return [2 /*return*/, response_1["default"].badRequest(res, "Mật khẩu không được để trống")];
                        }
                        return [4 /*yield*/, userService_1["default"].changePassword(user._id, password, oldPassword, user.password)];
                    case 1:
                        _b.sent();
                        response_1["default"].ok(res, { message: "Thay đổi mật khẩu thành công" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendResetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var param;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = req.body.param;
                        if (!param)
                            return [2 /*return*/, response_1["default"].badRequest(res, "Vui lòng nhập username hoặc email của bạn")];
                        return [4 /*yield*/, userService_1["default"].sendResetPassword(param)];
                    case 1:
                        _a.sent();
                        response_1["default"].ok(res, {
                            message: "Một tin nhắn đã được gửi tới email của bạn. Vui lòng kiểm tra email và tiến hành cập nhật lại mật khẩu"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.resetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, reset_password_token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, reset_password_token = _a.reset_password_token;
                        if (!password)
                            return [2 /*return*/, response_1["default"].badRequest(res, "Vui lòng nhập mật khẩu mới")];
                        return [4 /*yield*/, userService_1["default"].resetPassword(password, reset_password_token)];
                    case 1:
                        _b.sent();
                        response_1["default"].ok(res, {
                            message: "Thay đổi mật khẩu thành công"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateGroupUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groups, id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groups = req.body.groups;
                        id = req.params.id;
                        if (!functions_1["default"].validArrObjId(groups)) {
                            return [2 /*return*/, response_1["default"].badRequest(res, "groups không đúng định dạng ObjectId")];
                        }
                        return [4 /*yield*/, userService_1["default"].updateGroupUser(id, groups)];
                    case 1:
                        user = _a.sent();
                        response_1["default"].ok(res, user);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = new UserController();
