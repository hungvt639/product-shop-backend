import { Req, Res } from "../../interfaces/Express";
import { Product } from "../../models/product/productModel";
import productService from "../../services/product/productService";
import HttpResponse from "../../utils/response";
import Utils from "../../utils/functions";

class ProductController {
    public async create(req: Req, res: Res) {
        const {
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
        } = req.body;
        const data = await productService.create({
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
        } as Product);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const { type } = req.query;
        const filter = Utils.removeKeyNull({ type });
        const sort = req.query.sort as string | undefined;
        const datas = await productService.gets(filter, req.querys, sort);
        HttpResponse.ok(res, datas);
    }
    public async gets_sale(req: Req, res: Res) {
        const sort = req.query.sort as string | undefined;
        const datas = await productService.gets_sale(req.querys, sort);
        HttpResponse.ok(res, datas);
    }
    public async get(req: Req, res: Res) {
        const { slug } = req.params;
        const data = await productService.get(slug);
        HttpResponse.ok(res, data);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await productService.del(id);
        HttpResponse.ok(res, { message: "Xóa product thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const {
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
        } = req.body;
        const product = await productService.edit(id, {
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
        HttpResponse.ok(res, product);
    }

    public async search(req: Req, res: Res) {
        const s = req.query.search as string | undefined;
        const products = await productService.search(req.querys, s);
        HttpResponse.ok(res, products);
    }
}

export default new ProductController();
