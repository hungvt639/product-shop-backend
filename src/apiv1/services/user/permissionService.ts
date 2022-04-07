import PermissionModel, { Permission } from "../../models/user/permissionModel";

class PermissionService {
    public async createPermission(name, url, method) {
        return await PermissionModel.create(new Permission(name, url, method));
    }

    public async getListPermission(filter) {
        return await PermissionModel.find(filter);
    }

    public async deletePermission(id) {
        const del = await PermissionModel.deleteOne({ _id: id });
        if (del.deletedCount <= 0)
            throw new Error("Xóa permission không thành công");
    }

    public async editPermission(id, data) {
        const permission = await PermissionModel.findOneAndUpdate(
            { _id: id },
            data,
            {
                new: true,
            }
        );
        if (!permission)
            throw new Error("Không tìm thấy permission có id là: " + id);
        return permission;
    }
}

export default new PermissionService();
