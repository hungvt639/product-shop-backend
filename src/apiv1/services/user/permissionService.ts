import PermissionModel, { Permission } from "../../models/user/permissionModel";

async function createPermission(name, url, method) {
    return await PermissionModel.create(new Permission(name, url, method));
}

async function getListPermission(filter) {
    return await PermissionModel.find(filter);
}

async function deletePermission(id) {
    const del = await PermissionModel.deleteOne({ _id: id });
    if (del.deletedCount <= 0)
        throw new Error("Xóa permission không thành công");
}

async function editPermission(id, data) {
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
export default {
    createPermission,
    getListPermission,
    deletePermission,
    editPermission,
};
