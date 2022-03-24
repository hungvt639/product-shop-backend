import { Req, Res } from "../interfaces/Express";
import PermissionModel, { Permission } from "../models/permissionModel";
import { generateURLs } from "../routers/_const";
import { removeKeyNull, valiDataPermission } from "../utils/functions";
import HttpResponse from "../utils/response";

async function getListUrl(req: Req, res: Res) {
    const URLs = generateURLs();
    HttpResponse.ok(res, URLs);
}

async function createPermission(req: Req, res: Res) {
    const { name, url, method } = req.body;
    if (valiDataPermission(method, url)) {
        const permission = await PermissionModel.create(
            new Permission(name, url, method)
        );
        return HttpResponse.ok(res, permission);
    } else HttpResponse.badRequest(res, "Dữ liệu không chính xác");
}

async function getListPermission(req: Req, res: Res) {
    const filter = removeKeyNull(req.query);
    const permission = await PermissionModel.find(filter);
    HttpResponse.ok(res, permission);
}

async function deletePermission(req: Req, res: Res) {
    const { id } = req.params;
    const permission = await PermissionModel.deleteOne({ _id: id });
    HttpResponse.ok(res, permission);
}

async function editPermission(req: Req, res: Res) {
    const { id } = req.params;

    const data = removeKeyNull(req.body);
    if (valiDataPermission(data.method, data.url)) {
        const permission = await PermissionModel.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
        return HttpResponse.ok(res, permission);
    } else HttpResponse.badRequest(res, "Dữ liệu không chính xác");
}

export default {
    createPermission,
    getListPermission,
    deletePermission,
    editPermission,
    getListUrl,
};
