import { Req, Res } from "../interfaces/Express";
import groupService from "../services/groupService";
import { removeKeyNull, validArrObjId } from "../utils/functions";
import HttpResponse from "../utils/response";
async function getGroups(req: Req, res: Res) {
    const filter = removeKeyNull(req.query);
    const groups = await groupService.getGroups(filter);
    HttpResponse.ok(res, groups);
}

async function createGroup(req: Req, res: Res) {
    const { name, permissions } = req.body;
    const group = await groupService.createGroup(name, permissions);
    HttpResponse.ok(res, group);
}

async function deleteGroup(req: Req, res: Res) {
    const { id } = req.params;
    await groupService.deleteGroup(id);
    HttpResponse.ok(res, { message: "Xóa group thành công" });
}

async function permissionOfGroup(req: Req, res: Res) {
    const { permissions } = req.body;
    const { id } = req.params;
    if (!validArrObjId(permissions)) {
        return HttpResponse.badRequest(
            res,
            "permissions không đúng định dạng ObjectId"
        );
    }
    const permission = await groupService.permissionOfGroup(id, permissions);
    HttpResponse.ok(res, permission);
}

const GroupController = {
    getGroups,
    createGroup,
    deleteGroup,
    permissionOfGroup,
};
export default GroupController;
