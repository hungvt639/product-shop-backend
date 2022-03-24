import { Req, Res } from "../interfaces/Express";
import GroupModel, { Group } from "../models/groupModel";
import PermissionModel from "../models/permissionModel";
import UserModel from "../models/userModel";
import { removeKeyNull } from "../utils/functions";
import HttpResponse from "../utils/response";

async function getGroups(req: Req, res: Res) {
    const filter = removeKeyNull(req.query);
    const groups = await GroupModel.find(filter).populate("permissions");
    HttpResponse.ok(res, groups);
}

async function createGroup(req: Req, res: Res) {
    const { name, permissions } = req.body;
    let perIds: String[] = [];

    if (permissions) {
        const pers = await PermissionModel.find({
            _id: { $in: permissions },
        });
        perIds = pers.map((p) => p._id);
    }
    const group = await GroupModel.create(new Group(name, perIds));
    // if (permissions) {
    //     if (typeof permissions === "object") {
    //         const pers = await PermissionModel.find({
    //             _id: { $in: permissions },
    //         });
    //         const perIds = pers.map((p) => p._id);
    //         group.permissions.push(...perIds);
    //     } else {
    //         const pers = await PermissionModel.findOne({ _id: permissions });
    //         console.log("p", pers);

    //         if (pers) group.permissions.push(pers._id);
    //     }
    //     await group.save();
    // }
    const r = await group.populate("permissions");
    HttpResponse.ok(res, r);
}

async function deleteGroup(req: Req, res: Res) {
    const { id } = req.params;
    const del = await GroupModel.deleteOne({ _id: id });
    HttpResponse.ok(res, del);
}

async function addPerToGroup(req: Req, res: Res) {
    const { permissionIds } = req.body;
    const { id } = req.params;
    const group = await GroupModel.findById(id);
    if (!group)
        return HttpResponse.badRequest(
            res,
            "Không tìm thấy Nhóm nào có id là: " + id
        );
    const pers = await PermissionModel.find({
        _id: { $in: permissionIds },
    });
    const perIds = pers.map((p) => p._id);
    const perNotIn = perIds.filter((id) => !group.permissions.includes(id));
    group.permissions.push(...perNotIn);
    await group.save();
    const r = await group.populate("permissions");
    HttpResponse.ok(res, r);
}
async function removePerFromGroup(req: Req, res: Res) {
    const { permissions } = req.body;
    const { id } = req.params;

    const group = await GroupModel.findOneAndUpdate(
        { _id: id },
        { $pullAll: { permissions: permissions } },
        { new: true }
    ).populate("permissions");
    HttpResponse.ok(res, group);
}

const GroupController = {
    getGroups,
    createGroup,
    deleteGroup,
    addPerToGroup,
    removePerFromGroup,
};
export default GroupController;
