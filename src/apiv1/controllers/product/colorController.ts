import { Req, Res } from "../../interfaces/Express";
import colorService from "../../services/product/colorService";
import HttpResponse from "../../utils/response";

async function create(req: Req, res: Res) {
    const { name, code } = req.body;
    if (!colorService._validateCodeColor(code))
        throw new Error("Mã màu không hợp lệ");
    const color = await colorService.create(name, code);
    HttpResponse.ok(res, color);
}

async function gets(req: Req, res: Res) {
    const colors = await colorService.gets();
    HttpResponse.ok(res, colors);
}

async function deleteColor(req: Req, res: Res) {
    const { id } = req.params;
    await colorService.deleteColor(id);
    HttpResponse.ok(res, { message: "Xóa color thành công" });
}

async function editColor(req: Req, res: Res) {
    const { id } = req.params;
    const { name, code } = req.body;
    if (!colorService._validateCodeColor(code))
        throw new Error("Mã màu không hợp lệ");
    const color = await colorService.editColor(id, name, code);
    HttpResponse.ok(res, color);
}
const ColorController = {
    create,
    gets,
    deleteColor,
    editColor,
};
export default ColorController;
