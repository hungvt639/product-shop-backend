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
const _const_1 = require("../../routers/_const");
const permissionService_1 = __importDefault(require("../../services/user/permissionService"));
const functions_1 = __importDefault(require("../../utils/functions"));
const response_1 = __importDefault(require("../../utils/response"));
class PermissionController {
    getListUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const URLs = (0, _const_1.generateURLs)();
            response_1.default.ok(res, URLs);
        });
    }
    createPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, url, method } = req.body;
            if (!functions_1.default.valiDataPermission(method, url))
                return response_1.default.badRequest(res, "Dữ liệu không chính xác");
            const permission = yield permissionService_1.default.createPermission(name, url, method);
            return response_1.default.ok(res, permission);
        });
    }
    getListPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = functions_1.default.removeKeyNull(req.query);
            const permission = yield permissionService_1.default.getListPermission(filter);
            response_1.default.ok(res, permission);
        });
    }
    deletePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield permissionService_1.default.deletePermission(id);
            response_1.default.ok(res, { message: "Xóa permission thành công" });
        });
    }
    editPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = functions_1.default.removeKeyNull(req.body);
            if (!functions_1.default.valiDataPermission(data.method, data.url))
                return response_1.default.badRequest(res, "Dữ liệu không chính xác");
            const permission = yield permissionService_1.default.editPermission(id, data);
            return response_1.default.ok(res, permission);
        });
    }
}
exports.default = new PermissionController();
//# sourceMappingURL=permissionController.js.map