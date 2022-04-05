import { Req, Res } from "../../interfaces/Express";
import typeService from "../../services/product/typeService";
import HttpResponse from "../../utils/response";

async function create(req: Req, res: Res) {
    const { name } = req.body;
    const color = await typeService.create(name);
    HttpResponse.ok(res, color);
}

async function gets(req: Req, res: Res) {
    const colors = await typeService.gets();
    HttpResponse.ok(res, colors);
}

async function deleteType(req: Req, res: Res) {
    const { id } = req.params;
    await typeService.deleteType(id);
    HttpResponse.ok(res, { message: "Xóa type thành công" });
}

async function editType(req: Req, res: Res) {
    const { id } = req.params;
    const { name } = req.body;
    const type = await typeService.editType(id, name);
    HttpResponse.ok(res, type);
}
const TypeController = {
    create,
    gets,
    deleteType,
    editType,
};
export default TypeController;
