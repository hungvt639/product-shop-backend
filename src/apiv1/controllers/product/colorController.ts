import { Req, Res } from "../../interfaces/Express";
import colorService from "../../services/product/colorService";
import HttpResponse from "../../utils/response";

class ColorController {
    public async create(req: Req, res: Res) {
        const { name, code } = req.body;
        if (!colorService._validateCodeColor(code))
            throw new Error("Mã màu không hợp lệ");
        const color = await colorService.create(name, code);
        HttpResponse.ok(res, color);
    }

    public async gets(req: Req, res: Res) {
        const colors = await colorService.gets();
        HttpResponse.ok(res, colors);
    }

    public async deleteColor(req: Req, res: Res) {
        const { id } = req.params;
        await colorService.deleteColor(id);
        HttpResponse.ok(res, { message: "Xóa color thành công" });
    }

    public async editColor(req: Req, res: Res) {
        const { id } = req.params;
        const { name, code } = req.body;
        if (!colorService._validateCodeColor(code))
            throw new Error("Mã màu không hợp lệ");
        const color = await colorService.editColor(id, name, code);
        HttpResponse.ok(res, color);
    }
}

export default new ColorController();
