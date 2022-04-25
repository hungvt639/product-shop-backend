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
const typeModel_1 = __importStar(require("../../models/product/typeModel"));
const productModel_1 = __importDefault(require("../../models/product/productModel"));
class TypeService {
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeModel_1.default.create(new typeModel_1.Type(name));
        });
    }
    gets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeModel_1.default.find({});
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield typeModel_1.default.findByIdAndRemove(id);
            if (!data)
                throw new Error("Xóa type không thành công");
        });
    }
    edit(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield typeModel_1.default.findByIdAndUpdate(id, { name }, {
                new: true,
            });
            if (!data)
                throw new Error("Không tìm thấy type có id là: " + id);
            return data;
        });
    }
    getsProducts(options, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            let types = yield typeModel_1.default.find({});
            const data = yield Promise.all(types.map((t) => __awaiter(this, void 0, void 0, function* () {
                const { _id, name, slug } = t;
                const product = yield productModel_1.default.paginate({ type: _id }, Object.assign(Object.assign({}, options), { sort, populate: [
                        {
                            path: "type",
                        },
                        {
                            path: "colors",
                        },
                    ] }));
                return { _id, name, slug, product };
            })));
            return data;
        });
    }
    get(s, options, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield typeModel_1.default.findOne({ slug: s });
            if (!type)
                throw new Error("Nhóm sản phẩm không tồn tại");
            const product = yield productModel_1.default.paginate({ type: type._id }, Object.assign(Object.assign({}, options), { sort, populate: [
                    {
                        path: "type",
                    },
                    {
                        path: "colors",
                    },
                ] }));
            const { _id, name, slug } = type;
            return Object.assign(Object.assign({}, type.toJSON()), { product });
        });
    }
}
exports.default = new TypeService();
//# sourceMappingURL=typeService.js.map