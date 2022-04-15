import { Req, Res } from "../../interfaces/Express";
import sizeService from "../../services/product/sizeService";
import HttpResponse from "../../utils/response";

class SizeController {
    public async create(req: Req, res: Res) {
        const { name } = req.body;
        const data = await sizeService.create(name);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const datas = await sizeService.gets();
        HttpResponse.ok(res, datas);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await sizeService.del(id);
        HttpResponse.ok(res, { message: "Xóa size thành công" });
    }
}

export default new SizeController();
