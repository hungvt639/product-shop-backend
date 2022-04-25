/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Group } from "../../models/user/groupModel";
declare class GroupService {
    getGroups(filter: any): Promise<(import("mongoose").Document<any, any, Group> & Group & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createGroup(name: any, permissions: any): Promise<import("mongoose").Document<any, any, Group> & Group & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteGroup(id: any): Promise<void>;
    permissionOfGroup(id: any, permissions: any): Promise<import("mongoose").Document<any, any, Group> & Group & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
declare const _default: GroupService;
export default _default;
