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
const productModel_1 = __importDefault(require("../../models/product/productModel"));
class ProductService {
    create(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new productModel_1.default(value);
            yield data.save();
            return yield data.populate("colors");
        });
    }
    gets(filter, options, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel_1.default.paginate(filter, Object.assign(Object.assign({}, options), { sort, populate: [
                    {
                        path: "type",
                    },
                    {
                        path: "colors",
                    },
                ] }));
        });
    }
    gets_sale(options, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel_1.default.paginate({ isSale: true }, Object.assign(Object.assign({}, options), { sort, populate: [
                    {
                        path: "type",
                    },
                    {
                        path: "colors",
                    },
                ] }));
        });
    }
    get(s) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productModel_1.default.findOne({ slug: s })
                .populate("type")
                .populate("colors");
            if (!product)
                throw new Error("Không tìm thấy sản phẩm");
            const { type } = product;
            const sames = yield productModel_1.default.find({ type: type._id, _id: { $ne: product._id } }, "_id name slug sold price img img1 isSale")
                .sort({ sold: -1 })
                .limit(5);
            return Object.assign(Object.assign({}, product.toJSON()), { sames });
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const del = yield productModel_1.default.findByIdAndRemove(id);
            if (!del)
                throw new Error("Xóa product không thành công");
        });
    }
    edit(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield productModel_1.default.findOneAndUpdate({ _id: id }, product, {
                new: true,
            })
                .populate("type")
                .populate("colors");
            if (!data)
                throw new Error("Không tìm thấy sản phẩm có id là: " + id);
            return data;
        });
    }
    search(q, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield productModel_1.default.search({
                query_string: {
                    fields: ["name", "slug"],
                    query: search,
                },
            }, { size: q.limit, from: (q.page - 1) * q.limit });
            return data.body.hits;
        });
    }
}
exports.default = new ProductService();
