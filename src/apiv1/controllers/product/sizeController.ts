import { Req, Res } from "../../interfaces/Express";
import sizeService from "../../services/product/sizeService";
import HttpResponse from "../../utils/response";

class SizeController {
    public async create(req: Req, res: Res) {
        const { name } = req.body;
        const size = await sizeService.create(name);
        HttpResponse.ok(res, size);
    }

    public async gets(req: Req, res: Res) {
        const sizes = await sizeService.gets();
        HttpResponse.ok(res, sizes);
    }

    public async deleteSize(req: Req, res: Res) {
        const { id } = req.params;
        await sizeService.deleteSize(id);
        HttpResponse.ok(res, { message: "Xóa size thành công" });
    }
}

export default new SizeController();
