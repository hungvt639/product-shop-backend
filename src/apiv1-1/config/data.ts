import PermissionModel, { Permission } from "../models/permissionModel";
import GroupModel, { Group } from "../models/groupModel";
import {
    generateListNamePermissions,
    generateURLs,
    METHOD,
} from "../routers/_const";

const persName = generateListNamePermissions();
const URLs = generateURLs();
export const PER: Permission[] = [
    new Permission(persName.get_profile, URLs.get_profile, METHOD.GET),
    new Permission(persName.get_list_users, URLs.get_list_users, METHOD.GET),
    new Permission(persName.get_user, URLs.get_user, METHOD.GET),
    new Permission(persName.edit_profile, URLs.edit_profile, METHOD.PUT),
    new Permission(persName.change_password, URLs.change_password, METHOD.PUT),
    new Permission(
        persName.update_group_for_user,
        URLs.update_group_for_user,
        METHOD.PUT
    ),
    new Permission(persName.create_per, URLs.create_per, METHOD.POST),
    new Permission(persName.list_per, URLs.list_per, METHOD.GET),
    new Permission(persName.edit_per, URLs.edit_per, METHOD.PUT),
    new Permission(persName.delete_per, URLs.delete_per, METHOD.DELETE),
    new Permission(persName.list_url, URLs.list_url, METHOD.GET),

    new Permission(persName.get_groups, URLs.get_groups, METHOD.GET),
    new Permission(persName.create_group, URLs.create_group, METHOD.POST),
    new Permission(persName.delete_group, URLs.delete_group, METHOD.DELETE),
    new Permission(
        persName.update_permission_in_group,
        URLs.update_permission_in_group,
        METHOD.POST
    ),
];
export const GROUP = {
    superAdmin: {
        name: "Super Admin",
        code: "super_admin",
        permissions: [
            persName.get_profile,
            persName.get_list_users,
            persName.get_user,
            persName.edit_profile,
            persName.change_password,
            persName.update_group_for_user,

            persName.create_per,
            persName.list_per,
            persName.edit_per,
            persName.delete_per,
            persName.list_url,

            persName.get_groups,
            persName.create_group,
            persName.delete_group,
            persName.update_permission_in_group,
        ],
    },
    user: {
        name: "User",
        code: "user",
        permissions: [
            persName.get_profile,
            persName.get_list_users,
            persName.get_user,
            persName.edit_profile,
            persName.change_password,
        ],
    },
};

async function addPermissionToModel() {
    // var route,
    //     routes = [];
    // app._router.stack.forEach(function (middleware) {
    //     if (middleware.route) {
    //         // routes registered directly on the app
    //         routes.push(middleware.route);
    //     } else if (middleware.name === "router") {
    //         // router middleware
    //         middleware.handle.stack.forEach(function (handler) {
    //             route = handler.route;
    //             route && routes.push(route);
    //         });
    //     }
    // });
    // console.log("routers ", routes);

    for (const per of PER) {
        const permission = await PermissionModel.findOne({ name: per.name });
        if (!permission) {
            await PermissionModel.create(per);
        }
    }
    console.log("Add permission V1-1 OK");
}

async function addGroupToModel() {
    for (const key in GROUP) {
        const group = GROUP[key];
        let gr = await GroupModel.findOne({ name: group.name });
        if (!gr) {
            gr = await GroupModel.create(new Group(group.name, []));
        }
        for (const p of group.permissions) {
            const per = await PermissionModel.findOne({ name: p }, "_id");
            if (per && !gr.permissions.includes(per._id)) {
                gr.permissions.push(per._id);
            }
        }
        await gr.save();
    }
    console.log("Add group V1-1 OK");
}

async function dataApiV1_1() {
    await addPermissionToModel();
    await addGroupToModel();
}
export default dataApiV1_1;
