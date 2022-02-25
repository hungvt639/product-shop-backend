import UserController from "../controllers/userController";
import fn from "../middlewares/fnHandler";
import { Router } from "express";
// import auth from "../middlewares/authentication";
// import { _Admin, _SuperAdmin, _User } from "../middlewares/permission";

const UserRouter = Router();

UserRouter.post("/register", fn(UserController.register));
// UserRouter.post("/login", fn(UserController.login));
// UserRouter.get("/profile", auth, fn(UserController.getProfile));
// UserRouter.post(
//     "/add-permisstion",
//     auth,
//     _SuperAdmin,
//     fn(UserController.addPermission)
// );
// UserRouter.post(
//     "/remove-permisstion",
//     auth,
//     _SuperAdmin,
//     fn(UserController.removePermission)
// );
// UserRouter.get("/users", auth, _Admin, fn(UserController.getListUser));
// UserRouter.get("/user/:id", auth, _Admin, fn(UserController.getUser));
// UserRouter.put("/edit-profile", auth, _User, fn(UserController.editProfile));
// UserRouter.put("/change-password", auth, fn(UserController.changePassword));

export default UserRouter;
