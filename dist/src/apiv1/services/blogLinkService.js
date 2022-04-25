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
const blogLinkModel_1 = __importStar(require("../models/blogLinkModel"));
class BlockLinkService {
    create(name, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogLinkModel_1.default.create(new blogLinkModel_1.BlogLink(name, content));
        });
    }
    gets(select) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogLinkModel_1.default.find({}, select);
        });
    }
    get(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield blogLinkModel_1.default.findOne({ slug: slug });
            if (!data)
                throw new Error("Không tìm thấy liên kết");
            return data;
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const del = yield blogLinkModel_1.default.findByIdAndRemove(id);
            if (!del)
                throw new Error("Xóa product không thành công");
        });
    }
    edit(id, name, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield blogLinkModel_1.default.findOneAndUpdate({ _id: id }, { name, content }, {
                new: true,
            });
            if (!data)
                throw new Error("Không tìm thấy sản phẩm có id là: " + id);
            return data;
        });
    }
}
exports.default = new BlockLinkService();
//# sourceMappingURL=blogLinkService.js.map