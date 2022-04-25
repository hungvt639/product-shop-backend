"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const groupModel_1 = __importStar(require("../../models/user/groupModel"));
const permissionModel_1 = __importDefault(require("../../models/user/permissionModel"));
const functions_1 = __importDefault(require("../../utils/functions"));
class GroupService {
    getGroups(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield groupModel_1.default.find(filter).populate("permissions");
        });
    }
    createGroup(name, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            let perIds = [];
            if (permissions) {
                if (!functions_1.default.validArrObjId(permissions)) {
                    throw new Error("permissions không đúng định dạng ObjectId");
                }
                const pers = yield permissionModel_1.default.find({
                    _id: { $in: permissions },
                });
                if (pers.length !== permissions.length) {
                    const perErr = permissions.filter((per) => !pers.filter((p) => p._id == per).length);
                    throw new Error(`Không tìm thấy Permission có id là ${perErr}`);
                }
                perIds = pers.map((p) => p._id);
            }
            const group = yield groupModel_1.default.create(new groupModel_1.Group(name, perIds));
            return yield group.populate("permissions");
        });
    }
    deleteGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const del = yield groupModel_1.default.deleteOne({ _id: id });
            if (del.deletedCount <= 0)
                throw new Error("Xóa group không thành công");
        });
    }
    permissionOfGroup(id, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield groupModel_1.default.findById(id);
            if (!group)
                throw new Error("Không tìm thấy Nhóm nào có id là: " + id);
            const pers = yield permissionModel_1.default.find({
                _id: { $in: permissions },
            });
            if (pers.length !== permissions.length) {
                const perErr = permissions.filter((per) => !pers.filter((p) => p._id == per).length);
                throw new Error(`Không tìm thấy Permission có id là ${perErr}`);
            }
            const perIds = pers.map((p) => p._id);
            group.permissions = perIds;
            yield group.save();
            return yield group.populate("permissions");
        });
    }
}
exports.default = new GroupService();
//# sourceMappingURL=groupService.js.map