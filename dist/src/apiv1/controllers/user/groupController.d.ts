import { Req, Res } from "../../interfaces/Express";
declare class GroupController {
    getGroups(req: Req, res: Res): Promise<void>;
    createGroup(req: Req, res: Res): Promise<void>;
    deleteGroup(req: Req, res: Res): Promise<void>;
    permissionOfGroup(req: Req, res: Res): Promise<void>;
}
declare const _default: GroupController;
export default _default;
