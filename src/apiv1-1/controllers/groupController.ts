import { Req, Res } from "../interfaces/Express";
import GroupModel, { Group } from "../models/groupModel";
import PermissionModel from "../models/permissionModel";
import UserModel from "../models/userModel";
import { removeKeyNull, validArrObjId } from "../utils/functions";
import HttpResponse from "../utils/response";
import { ObjectId } from "mongoose";
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

async function permissionOfGroup(req: Req, res: Res) {
    const { permissions } = req.body;
    const { id } = req.params;
    const group = await GroupModel.findById(id);
    if (!validArrObjId(permissions)) {
        return HttpResponse.badRequest(
            res,
            "permissions không đúng định dạng ObjectId"
        );
    }
    if (!group)
        return HttpResponse.badRequest(
            res,
            "Không tìm thấy Nhóm nào có id là: " + id
        );
    const pers = await PermissionModel.find({
        _id: { $in: permissions },
    });
    if (pers.length !== permissions.length) {
        const perErr = permissions.filter(
            (per: string) => !pers.filter((p) => p._id == per).length
        );
        return HttpResponse.badRequest(
            res,
            `Không tìm thấy Permission có id là ${perErr}`
        );
    }
    const perIds = pers.map((p) => p._id);
    group.permissions = perIds;
    await group.save();
    const r = await group.populate("permissions");
    HttpResponse.ok(res, r);
}

const GroupController = {
    getGroups,
    createGroup,
    deleteGroup,
    permissionOfGroup,
};
export default GroupController;
