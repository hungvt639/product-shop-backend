import { Req, Res } from "../../interfaces/Express";
import { Product } from "../../models/product/productModel";
import productService from "../../services/product/productService";
import HttpResponse from "../../utils/response";

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
        const color = await productService.create({
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
        HttpResponse.ok(res, color);
    }

    public async gets(req: Req, res: Res) {
        const sort = req.query.sort as string | undefined;
        const select = req.query.select as string | undefined;

        const products = await productService.gets(sort, select);
        HttpResponse.ok(res, products);
    }
    public async gets_sale(req: Req, res: Res) {
        const products = await productService.gets_sale();
        HttpResponse.ok(res, products);
    }
    public async get(req: Req, res: Res) {
        const { slug } = req.params;
        const products = await productService.get(slug);
        HttpResponse.ok(res, products);
    }

    public async deleteP(req: Req, res: Res) {
        const { id } = req.params;
        await productService.deleteP(id);
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
}

export default new ProductController();
