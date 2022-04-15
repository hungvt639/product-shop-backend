import { Req, Res } from "../../interfaces/Express";
import typeService from "../../services/product/typeService";
import HttpResponse from "../../utils/response";

class TypeController {
    public async create(req: Req, res: Res) {
        const { name } = req.body;
        const color = await typeService.create(name);
        HttpResponse.ok(res, color);
    }

    public async gets(req: Req, res: Res) {
        const datas = await typeService.gets();
        HttpResponse.ok(res, datas);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await typeService.del(id);
        HttpResponse.ok(res, { message: "Xóa nhóm thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const { name } = req.body;
        const data = await typeService.edit(id, name);
        HttpResponse.ok(res, data);
    }
}

export default new TypeController();
