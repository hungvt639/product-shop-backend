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
Object.defineProperty(exports, "__esModule", { value: true });
const colorModel_1 = __importStar(require("../../models/product/colorModel"));
class ColorService {
    create(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield colorModel_1.default.create(new colorModel_1.Color(name, code));
        });
    }
    gets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield colorModel_1.default.find({});
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield colorModel_1.default.findByIdAndRemove(id);
            if (!data)
                throw new Error("Xóa color không thành công");
        });
    }
    edit(id, name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield colorModel_1.default.findByIdAndUpdate(id, { name, code }, {
                new: true,
            });
            if (!data)
                throw new Error("Không tìm thấy color có id là: " + id);
            return data;
        });
    }
    _validateCodeColor(code) {
        if (!code)
            return false;
        return (code.length === 7 || code.length === 9) && code.startsWith("#");
    }
}
exports.default = new ColorService();
//# sourceMappingURL=colorService.js.map