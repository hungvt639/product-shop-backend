import { Req, Res } from "../../interfaces/Express";
declare class PermissionController {
    getListUrl(req: Req, res: Res): Promise<void>;
    createPermission(req: Req, res: Res): Promise<void>;
    getListPermission(req: Req, res: Res): Promise<void>;
    deletePermission(req: Req, res: Res): Promise<void>;
    editPermission(req: Req, res: Res): Promise<void>;
}
declare const _default: PermissionController;
export default _default;
