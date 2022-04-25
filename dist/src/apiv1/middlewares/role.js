"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
const role = (req, res, next) => {
    const { method, baseUrl, user } = req;
    if (_hasPermission(user, method, baseUrl))
        next();
    else
        response_1.default.forbidden(res, "Bạn không có quyền truy cập chức năng này");
};
exports.default = role;
function _hasPermission(user, method, baseUrl) {
    if (!user)
        return true;
    for (const group of user.groups) {
        for (const permission of group.permissions) {
            if (permission.url.startsWith(baseUrl) &&
                permission.method === method)
                return true;
        }
    }
    return false;
}
//# sourceMappingURL=role.js.map