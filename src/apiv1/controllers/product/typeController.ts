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
        const colors = await typeService.gets();
        HttpResponse.ok(res, colors);
    }

    public async deleteType(req: Req, res: Res) {
        const { id } = req.params;
        await typeService.deleteType(id);
        HttpResponse.ok(res, { message: "Xóa type thành công" });
    }

    public async editType(req: Req, res: Res) {
        const { id } = req.params;
        const { name } = req.body;
        const type = await typeService.editType(id, name);
        HttpResponse.ok(res, type);
    }
}

export default new TypeController();
