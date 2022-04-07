import GroupModel, { Group } from "../../models/user/groupModel";
import PermissionModel from "../../models/user/permissionModel";
import { validArrObjId } from "../../utils/functions";

class GroupService {
    public async getGroups(filter) {
        return await GroupModel.find(filter).populate("permissions");
    }

    public async createGroup(name, permissions) {
        let perIds: String[] = [];
        if (permissions) {
            if (!validArrObjId(permissions)) {
                throw new Error("permissions không đúng định dạng ObjectId");
            }
            const pers = await PermissionModel.find({
                _id: { $in: permissions },
            });
            if (pers.length !== permissions.length) {
                const perErr = permissions.filter(
                    (per: string) => !pers.filter((p) => p._id == per).length
                );
                throw new Error(`Không tìm thấy Permission có id là ${perErr}`);
            }
            perIds = pers.map((p) => p._id);
        }
        const group = await GroupModel.create(new Group(name, perIds));
        return await group.populate("permissions");
    }

    public async deleteGroup(id) {
        const del = await GroupModel.deleteOne({ _id: id });
        if (del.deletedCount <= 0)
            throw new Error("Xóa group không thành công");
    }

    public async permissionOfGroup(id, permissions) {
        const group = await GroupModel.findById(id);
        if (!group) throw new Error("Không tìm thấy Nhóm nào có id là: " + id);
        const pers = await PermissionModel.find({
            _id: { $in: permissions },
        });
        if (pers.length !== permissions.length) {
            const perErr = permissions.filter(
                (per: string) => !pers.filter((p) => p._id == per).length
            );
            throw new Error(`Không tìm thấy Permission có id là ${perErr}`);
        }
        const perIds = pers.map((p) => p._id);
        group.permissions = perIds;
        await group.save();
        return await group.populate("permissions");
    }
}

export default new GroupService();
