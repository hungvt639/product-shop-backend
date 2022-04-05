import { Req, Res } from "../../interfaces/Express";
import { Product } from "../../models/product/productModel";
import productService from "../../services/product/productService";
import HttpResponse from "../../utils/response";

async function create(req: Req, res: Res) {
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

async function gets(req: Req, res: Res) {
    const products = await productService.gets();
    HttpResponse.ok(res, products);
}

async function deleteP(req: Req, res: Res) {
    const { id } = req.params;
    await productService.deleteP(id);
    HttpResponse.ok(res, { message: "Xóa product thành công" });
}

async function edit(req: Req, res: Res) {
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
    });
    HttpResponse.ok(res, product);
}
const TypeController = {
    create,
    gets,
    deleteP,
    edit,
};
export default TypeController;
