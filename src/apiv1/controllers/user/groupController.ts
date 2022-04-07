import { Req, Res } from "../../interfaces/Express";
import groupService from "../../services/user/groupService";
import { removeKeyNull, validArrObjId } from "../../utils/functions";
import HttpResponse from "../../utils/response";

class GroupController {
    public async getGroups(req: Req, res: Res) {
        const filter = removeKeyNull(req.query);
        const groups = await groupService.getGroups(filter);
        HttpResponse.ok(res, groups);
    }

    public async createGroup(req: Req, res: Res) {
        const { name, permissions } = req.body;
        const group = await groupService.createGroup(name, permissions);
        HttpResponse.ok(res, group);
    }

    public async deleteGroup(req: Req, res: Res) {
        const { id } = req.params;
        await groupService.deleteGroup(id);
        HttpResponse.ok(res, { message: "Xóa group thành công" });
    }

    public async permissionOfGroup(req: Req, res: Res) {
        const { permissions } = req.body;
        const { id } = req.params;
        if (!validArrObjId(permissions)) {
            return HttpResponse.badRequest(
                res,
                "permissions không đúng định dạng ObjectId"
            );
        }
        const permission = await groupService.permissionOfGroup(
            id,
            permissions
        );
        HttpResponse.ok(res, permission);
    }
}
export default new GroupController();
