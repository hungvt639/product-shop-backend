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
const groupService_1 = __importDefault(require("../../services/user/groupService"));
const functions_1 = __importDefault(require("../../utils/functions"));
const response_1 = __importDefault(require("../../utils/response"));
class GroupController {
    getGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = functions_1.default.removeKeyNull(req.query);
            const groups = yield groupService_1.default.getGroups(filter);
            response_1.default.ok(res, groups);
        });
    }
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, permissions } = req.body;
            const group = yield groupService_1.default.createGroup(name, permissions);
            response_1.default.ok(res, group);
        });
    }
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield groupService_1.default.deleteGroup(id);
            response_1.default.ok(res, { message: "Xóa group thành công" });
        });
    }
    permissionOfGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { permissions } = req.body;
            const { id } = req.params;
            if (!functions_1.default.validArrObjId(permissions)) {
                return response_1.default.badRequest(res, "permissions không đúng định dạng ObjectId");
            }
            const permission = yield groupService_1.default.permissionOfGroup(id, permissions);
            response_1.default.ok(res, permission);
        });
    }
}
exports.default = new GroupController();
