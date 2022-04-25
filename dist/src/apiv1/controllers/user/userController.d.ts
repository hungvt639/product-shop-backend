import { Req, Res } from "../../interfaces/Express";
declare class UserController {
    register(req: Req, res: Res): Promise<void>;
    activateUser(req: Req, res: Res): Promise<void>;
    login(req: Req, res: Res): Promise<void>;
    getProfile(req: Req, res: Res): Promise<void>;
    getListUser(req: Req, res: Res): Promise<void>;
    getUser(req: Req, res: Res): Promise<void>;
    editProfile(req: Req, res: Res): Promise<void>;
    changePassword(req: Req, res: Res): Promise<void>;
    sendResetPassword(req: Req, res: Res): Promise<void>;
    resetPassword(req: Req, res: Res): Promise<void>;
    updateGroupUser(req: Req, res: Res): Promise<void>;
}
declare const _default: UserController;
export default _default;
