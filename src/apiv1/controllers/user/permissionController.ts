import { Req, Res } from "../../interfaces/Express";
import { generateURLs } from "../../routers/_const";
import permissionService from "../../services/user/permissionService";
import Utils from "../../utils/functions";
import HttpResponse from "../../utils/response";

class PermissionController {
    public async getListUrl(req: Req, res: Res) {
        const URLs = generateURLs();
        HttpResponse.ok(res, URLs);
    }

    public async createPermission(req: Req, res: Res) {
        const { name, url, method } = req.body;
        if (!Utils.valiDataPermission(method, url))
            return HttpResponse.badRequest(res, "Dữ liệu không chính xác");
        const permission = await permissionService.createPermission(
            name,
            url,
            method
        );
        return HttpResponse.ok(res, permission);
    }

    public async getListPermission(req: Req, res: Res) {
        const filter = Utils.removeKeyNull(req.query);
        const permission = await permissionService.getListPermission(filter);
        HttpResponse.ok(res, permission);
    }

    public async deletePermission(req: Req, res: Res) {
        const { id } = req.params;
        await permissionService.deletePermission(id);
        HttpResponse.ok(res, { message: "Xóa permission thành công" });
    }

    public async editPermission(req: Req, res: Res) {
        const { id } = req.params;

        const data = Utils.removeKeyNull(req.body);
        if (!Utils.valiDataPermission(data.method, data.url))
            return HttpResponse.badRequest(res, "Dữ liệu không chính xác");
        const permission = await permissionService.editPermission(id, data);
        return HttpResponse.ok(res, permission);
    }
}

export default new PermissionController();
