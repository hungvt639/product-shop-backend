import { Req, Res } from "../../interfaces/Express";
import colorService from "../../services/product/colorService";
import HttpResponse from "../../utils/response";

class ColorController {
    public async create(req: Req, res: Res) {
        const { name, code } = req.body;
        if (!colorService._validateCodeColor(code))
            throw new Error("Mã màu không hợp lệ");
        const data = await colorService.create(name, code);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const datas = await colorService.gets();
        HttpResponse.ok(res, datas);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await colorService.del(id);
        HttpResponse.ok(res, { message: "Xóa color thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const { name, code } = req.body;
        if (!colorService._validateCodeColor(code))
            throw new Error("Mã màu không hợp lệ");
        const data = await colorService.edit(id, name, code);
        HttpResponse.ok(res, data);
    }
}

export default new ColorController();
