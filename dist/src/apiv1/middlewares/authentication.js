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
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const userModel_1 = __importDefault(require("../models/user/userModel"));
const response_1 = __importDefault(require("../utils/response"));
const auth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return response_1.default.unauthorizer(res, "Vui lòng đăng nhập để sử dụng chức năng này!");
    }
    const tokens = bearerToken.split(" ");
    if (tokens[0] !== "Bearer") {
        return response_1.default.unauthorizer(res, "Token is not valid");
    }
    else {
        jsonwebtoken_1.default.verify(tokens[1], env_1.default.SECRET, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                yield userModel_1.default.getProfile(payload._id, "_id email username fullname avatar")
                    .exec()
                    .then((user) => {
                    if (user) {
                        req.user = user;
                        next();
                    }
                    else {
                        response_1.default.unauthorizer(res, "Không tồn tại tài khoản này");
                    }
                })
                    .catch((err) => {
                    return response_1.default.unauthorizer(res, err.message);
                });
            }
            else {
                return response_1.default.unauthorizer(res, err.message);
            }
        }));
    }
};
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return response_1.default.unauthorizer(res, "Vui lòng đăng nhập để sử dụng chức năng này!");
        }
        const tokens = bearerToken.split(" ");
        if (tokens[0] !== "Bearer")
            return response_1.default.unauthorizer(res, "Token is not valid");
        const payload = jsonwebtoken_1.default.verify(tokens[1], env_1.default.SECRET);
        const user = yield userModel_1.default.getProfile(payload._id, "_id email username fullname avatar");
        if (!user) {
            return response_1.default.unauthorizer(res, "Không tồn tại tài khoản này");
        }
        else {
            req.user = user;
            return true;
        }
    }
    catch (e) {
        return response_1.default.unauthorizer(res, e.message);
    }
});
exports.checkAuth = checkAuth;
exports.default = auth;
