"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROUP = exports.PER = void 0;
const permissionModel_1 = __importStar(require("../models/user/permissionModel"));
const groupModel_1 = __importStar(require("../models/user/groupModel"));
const _const_1 = require("../routers/_const");
const persName = (0, _const_1.generateListNamePermissions)();
const URLs = (0, _const_1.generateURLs)();
exports.PER = [
    new permissionModel_1.Permission(persName.get_profile, URLs.get_profile, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_list_users, URLs.get_list_users, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_user, URLs.get_user, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.edit_profile, URLs.edit_profile, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.change_password, URLs.change_password, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.update_group_for_user, URLs.update_group_for_user, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.create_per, URLs.create_per, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.list_per, URLs.list_per, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.edit_per, URLs.edit_per, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_per, URLs.delete_per, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.list_url, URLs.list_url, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_groups, URLs.get_groups, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_group, URLs.create_group, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.delete_group, URLs.delete_group, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.update_permission_in_group, URLs.update_permission_in_group, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.create_size, URLs.create_size, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.get_list_size, URLs.get_list_size, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.delete_size, URLs.delete_size, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.get_list_color, URLs.get_list_color, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_color, URLs.create_color, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.edit_color, URLs.edit_color, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_color, URLs.delete_color, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.upload_img, URLs.upload_img, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.get_list_type, URLs.get_list_type, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_type, URLs.create_type, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.edit_type, URLs.edit_type, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_type, URLs.delete_type, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.get_list_product, URLs.get_list_product, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_product, URLs.create_product, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.edit_product, URLs.edit_product, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_product, URLs.delete_product, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.get_product, URLs.get_product, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_order, URLs.create_order, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.updte_order, URLs.updte_order, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.get_order_detail, URLs.get_order_detail, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_list_order, URLs.get_list_order, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_list_carousel, URLs.get_list_carousel, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.create_carousel, URLs.create_carousel, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.edit_carousel, URLs.edit_carousel, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_carousel, URLs.delete_carousel, _const_1.METHOD.DELETE),
    new permissionModel_1.Permission(persName.get_list_blog_link, URLs.get_list_blog_link, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.get_blog_link, URLs.get_blog_link, _const_1.METHOD.GET),
    new permissionModel_1.Permission(persName.creat_blog_link, URLs.creat_blog_link, _const_1.METHOD.POST),
    new permissionModel_1.Permission(persName.edit_blog_link, URLs.edit_blog_link, _const_1.METHOD.PUT),
    new permissionModel_1.Permission(persName.delete_blog_link, URLs.delete_blog_link, _const_1.METHOD.DELETE),
];
exports.GROUP = {
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
            persName.get_list_carousel,
            persName.create_carousel,
            persName.edit_carousel,
            persName.delete_carousel,
            persName.get_list_blog_link,
            persName.get_blog_link,
            persName.creat_blog_link,
            persName.edit_blog_link,
            persName.delete_blog_link,
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
function addPermissionToModel() {
    return __awaiter(this, void 0, void 0, function* () {
        const permissionIds = exports.PER.map((p) => p.name);
        const pers = yield permissionModel_1.default.find({
            name: { $in: permissionIds },
        });
        if (pers.length !== permissionIds.length) {
            const perErr = exports.PER.filter((per) => !pers.filter((p) => p.name === per.name).length);
            yield permissionModel_1.default.create(perErr);
        }
        console.log("Add permission V1-1 OK");
    });
}
function addGroupToModel() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key in exports.GROUP) {
            const group = exports.GROUP[key];
            let gr = yield groupModel_1.default.findOne({ name: group.name });
            if (!gr) {
                gr = yield groupModel_1.default.create(new groupModel_1.Group(group.name, []));
            }
            for (const p of group.permissions) {
                const per = yield permissionModel_1.default.findOne({ name: p }, "_id");
                if (per && !gr.permissions.includes(per._id)) {
                    gr.permissions.push(per._id);
                }
            }
            yield gr.save();
        }
        console.log("Add group V1-1 OK");
    });
}
function dataApiV1() {
    return __awaiter(this, void 0, void 0, function* () {
        yield addPermissionToModel();
        yield addGroupToModel();
    });
}
exports.default = dataApiV1;
