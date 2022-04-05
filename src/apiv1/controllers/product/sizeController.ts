import { Req, Res } from "../../interfaces/Express";
import sizeService from "../../services/product/sizeService";
import HttpResponse from "../../utils/response";

async function create(req: Req, res: Res) {
    const { name } = req.body;
    const size = await sizeService.create(name);
    HttpResponse.ok(res, size);
}

async function gets(req: Req, res: Res) {
    const sizes = await sizeService.gets();
    HttpResponse.ok(res, sizes);
}

async function deleteSize(req: Req, res: Res) {
    const { id } = req.params;
    await sizeService.deleteSize(id);
    HttpResponse.ok(res, { message: "Xóa size thành công" });
}

const SizeController = {
    create,
    gets,
    deleteSize,
};
export default SizeController;
