import UserCtl from "../controllers/userController";
import { Router } from "express";
import auth from "../middlewares/authentication";
import _ from "../middlewares/fnHandler";
import role from "../middlewares/role";
import { ROUTE } from "./_const";

const uRoute = ROUTE.user;

const UserRouter = Router();

UserRouter.post(uRoute.register, _(UserCtl.register));
UserRouter.post(uRoute.activate_user, _(UserCtl.activateUser));
UserRouter.post(uRoute.login, _(UserCtl.login));
UserRouter.get(uRoute.get_profile, auth, role, _(UserCtl.getProfile));
UserRouter.get(uRoute.get_list_users, auth, role, _(UserCtl.getListUser));
UserRouter.get(uRoute.get_user, auth, role, _(UserCtl.getUser));
UserRouter.put(uRoute.edit_profile, auth, role, _(UserCtl.editProfile));
UserRouter.put(uRoute.change_password, auth, role, _(UserCtl.changePassword));
UserRouter.post(uRoute.send_reset_password, _(UserCtl.sendResetPassword));
UserRouter.post(uRoute.reset_password, _(UserCtl.resetPassword));
UserRouter.put(
    uRoute.update_group_for_user,
    auth,
    role,
    _(UserCtl.updateGroupUser)
);

export default UserRouter;
