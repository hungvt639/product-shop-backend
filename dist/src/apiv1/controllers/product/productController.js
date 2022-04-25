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
const productService_1 = __importDefault(require("../../services/product/productService"));
const response_1 = __importDefault(require("../../utils/response"));
const functions_1 = __importDefault(require("../../utils/functions"));
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, img, img1, image, price, sizes, colors, type, description, information, sold, } = req.body;
            const data = yield productService_1.default.create({
                name,
                img,
                img1,
                image,
                price,
                sizes,
                colors,
                type,
                description,
                information,
                sold,
            });
            response_1.default.ok(res, data);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.query;
            const filter = functions_1.default.removeKeyNull({ type });
            const sort = req.query.sort;
            const datas = yield productService_1.default.gets(filter, req.querys, sort);
            response_1.default.ok(res, datas);
        });
    }
    gets_sale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = req.query.sort;
            const datas = yield productService_1.default.gets_sale(req.querys, sort);
            response_1.default.ok(res, datas);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield productService_1.default.get(slug);
            response_1.default.ok(res, data);
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield productService_1.default.del(id);
            response_1.default.ok(res, { message: "Xóa product thành công" });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, img, img1, image, price, sizes, colors, type, description, information, sold, isSale, } = req.body;
            const product = yield productService_1.default.edit(id, {
                name,
                img,
                img1,
                image,
                price,
                sizes,
                colors,
                type,
                description,
                information,
                sold,
                isSale,
            });
            response_1.default.ok(res, product);
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = req.query.search;
            const products = yield productService_1.default.search(req.querys, s);
            response_1.default.ok(res, products);
        });
    }
}
exports.default = new ProductController();
