import { Req, Res } from "../interfaces/Express";
import { generateURLs } from "../routers/_const";
import permissionService from "../services/permissionService";
import { removeKeyNull, valiDataPermission } from "../utils/functions";
import HttpResponse from "../utils/response";

async function getListUrl(req: Req, res: Res) {
    const URLs = generateURLs();
    HttpResponse.ok(res, URLs);
}

async function createPermission(req: Req, res: Res) {
    const { name, url, method } = req.body;
    if (!valiDataPermission(method, url))
        return HttpResponse.badRequest(res, "Dữ liệu không chính xác");
    const permission = await permissionService.createPermission(
        name,
        url,
        method
    );
    return HttpResponse.ok(res, permission);
}

async function getListPermission(req: Req, res: Res) {
    const filter = removeKeyNull(req.query);
    const permission = await permissionService.getListPermission(filter);
    HttpResponse.ok(res, permission);
}

async function deletePermission(req: Req, res: Res) {
    const { id } = req.params;
    await permissionService.deletePermission(id);
    HttpResponse.ok(res, { message: "Xóa permission thành công" });
}

async function editPermission(req: Req, res: Res) {
    const { id } = req.params;

    const data = removeKeyNull(req.body);
    if (!valiDataPermission(data.method, data.url))
        return HttpResponse.badRequest(res, "Dữ liệu không chính xác");
    const permission = await permissionService.editPermission(id, data);
    return HttpResponse.ok(res, permission);
}

export default {
    createPermission,
    getListPermission,
    deletePermission,
    editPermission,
    getListUrl,
};
