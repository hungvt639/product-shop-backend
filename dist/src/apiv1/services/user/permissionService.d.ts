/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Permission } from "../../models/user/permissionModel";
declare class PermissionService {
    createPermission(name: any, url: any, method: any): Promise<import("mongoose").Document<any, any, Permission> & Permission & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    getListPermission(filter: any): Promise<(import("mongoose").Document<any, any, Permission> & Permission & {
        _id: import("mongoose").Schema.Types.ObjectId;
    })[]>;
    deletePermission(id: any): Promise<void>;
    editPermission(id: any, data: any): Promise<import("mongoose").Document<any, any, Permission> & Permission & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
}
declare const _default: PermissionService;
export default _default;
