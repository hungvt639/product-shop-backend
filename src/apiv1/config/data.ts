import GroupModel, { Group, GROUP } from "../models/groupModel";
import PermissionModel, { PER } from "../models/permissionModel";
import { generatePermission } from "../utils/functions";

async function addPermissionToModel() {
    const permissions = generatePermission(PER);
    for (const permission of permissions) {
        const per = await PermissionModel.findOne(
            { code: permission.code },
            "_id"
        );
        if (!per) {
            await PermissionModel.create(permission);
        }
    }
    console.log("Add permission OK");
}

async function addGroupToModel() {
    for (const key in GROUP) {
        const { code, permission }: { code: string; permission: string[] } =
            GROUP[key];
        let group = await GroupModel.findOne({ code }, "_id code permissions");
        if (!group) {
            group = await GroupModel.create(new Group(code));
        }
        for (const per of permission) {
            const permission = await PermissionModel.findOne(
                { code: per },
                "_id"
            );

            if (!group.permissions.includes(permission._id)) {
                group.permissions.push(permission._id);
            }
        }
        await group.save();
    }
    console.log("Add group OK");
}

async function dataApiV1() {
    await addPermissionToModel();
    await addGroupToModel();
}
export default dataApiV1;
