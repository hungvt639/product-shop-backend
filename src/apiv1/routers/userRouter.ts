import UserController from "../controllers/userController";
import { Router } from "express";
import auth from "../middlewares/authentication";
import { PER } from "../models/permissionModel";
import { _per } from "../middlewares/permission";

const UserRouter = Router();

UserRouter.post("/register", _per(UserController.register));
UserRouter.post("/activate-user", _per(UserController.activateUser));
UserRouter.post("/login", _per(UserController.login));
UserRouter.get(
    "/profile",
    auth,
    _per(UserController.getProfile, PER.view_user)
);
// UserRouter.post("/add-permisstion", auth, _per(UserController.addPermission));
// UserRouter.post(
//     "/remove-permisstion",
//     auth,
//     _per(UserController.removePermission)
// );
UserRouter.get("/users", auth, _per(UserController.getListUser, PER.view_user));

UserRouter.get("/user/:id", auth, _per(UserController.getUser, PER.view_user));
UserRouter.put(
    "/edit-profile",
    auth,
    _per(UserController.editProfile, PER.edit_user)
);
UserRouter.put(
    "/change-password",
    auth,
    _per(UserController.changePassword, PER.edit_user)
);
UserRouter.post("/send-reset-password", _per(UserController.sendResetPassword));
UserRouter.post("/reset-password", _per(UserController.resetPassword));

export default UserRouter;
