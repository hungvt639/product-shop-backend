import { Req, Res } from "../interfaces/Express";
import blogLinkService from "../services/blogLinkService";
import HttpResponse from "../utils/response";

class ProductController {
    public async create(req: Req, res: Res) {
        const { name, content } = req.body;
        const data = await blogLinkService.create(name, content);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const { select } = req.querys;
        const datas = await blogLinkService.gets(select);
        HttpResponse.ok(res, datas);
    }

    public async get(req: Req, res: Res) {
        const { slug } = req.params;
        const data = await blogLinkService.get(slug);
        HttpResponse.ok(res, data);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await blogLinkService.del(id);
        HttpResponse.ok(res, { message: "Xóa liên kết thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const { name, content } = req.body;
        const product = await blogLinkService.edit(id, name, content);
        HttpResponse.ok(res, product);
    }
}

export default new ProductController();
