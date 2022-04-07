import PermissionModel, { Permission } from "../models/user/permissionModel";
import GroupModel, { Group } from "../models/user/groupModel";
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
    new Permission(persName.create_size, URLs.create_size, METHOD.POST),
    new Permission(persName.get_list_size, URLs.get_list_size, METHOD.GET),
    new Permission(persName.delete_size, URLs.delete_size, METHOD.DELETE),

    new Permission(persName.get_list_color, URLs.get_list_color, METHOD.GET),
    new Permission(persName.create_color, URLs.create_color, METHOD.POST),
    new Permission(persName.edit_color, URLs.edit_color, METHOD.PUT),
    new Permission(persName.delete_color, URLs.delete_color, METHOD.DELETE),

    new Permission(persName.upload_img, URLs.upload_img, METHOD.POST),

    new Permission(persName.get_list_type, URLs.get_list_type, METHOD.GET),
    new Permission(persName.create_type, URLs.create_type, METHOD.POST),
    new Permission(persName.edit_type, URLs.edit_type, METHOD.PUT),
    new Permission(persName.delete_type, URLs.delete_type, METHOD.DELETE),

    new Permission(
        persName.get_list_product,
        URLs.get_list_product,
        METHOD.GET
    ),
    new Permission(persName.create_product, URLs.create_product, METHOD.POST),
    new Permission(persName.edit_product, URLs.edit_product, METHOD.PUT),
    new Permission(persName.delete_product, URLs.delete_product, METHOD.DELETE),
    new Permission(persName.get_product, URLs.get_product, METHOD.GET),

    new Permission(persName.create_order, URLs.create_order, METHOD.POST),
    new Permission(persName.updte_order, URLs.updte_order, METHOD.PUT),
    new Permission(
        persName.get_order_detail,
        URLs.get_order_detail,
        METHOD.GET
    ),
    new Permission(persName.get_list_order, URLs.get_list_order, METHOD.GET),
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

            persName.create_size,
            persName.get_list_size,
            persName.delete_size,

            persName.get_list_color,
            persName.create_color,
            persName.edit_color,
            persName.delete_color,

            persName.upload_img,

            persName.get_list_type,
            persName.create_type,
            persName.edit_type,
            persName.delete_type,

            persName.get_list_product,
            persName.create_product,
            persName.edit_product,
            persName.delete_product,
            persName.get_product,

            persName.create_order,
            persName.updte_order,
            persName.get_order_detail,
            persName.get_list_order,
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
    const permissionIds = PER.map((p) => p.name);
    const pers = await PermissionModel.find({
        name: { $in: permissionIds },
    });
    if (pers.length !== permissionIds.length) {
        const perErr = PER.filter(
            (per: Permission) => !pers.filter((p) => p.name === per.name).length
        );
        await PermissionModel.create(perErr);
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

async function dataApiV1() {
    await addPermissionToModel();
    await addGroupToModel();
}
export default dataApiV1;
