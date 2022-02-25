import { Req, Res } from "../interfaces/Express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { SchemaDefinitionProperty } from "mongoose";
import HttpResponse from "../utils/response";
import { _setOption } from "../utils/functions";
import User from "../models/user";

interface DataLoginInterface {
    username: String;
    password: String;
}

async function register(req: Req, res: Res) {
    const data = req.body;
    const user = await User.create(data);
    HttpResponse.ok(res, user);
}

// async function login(req: Req, res: Res) {
//     const data: DataLoginInterface = req.body;
//     if (!data.username || !data.password) {
//         return HttpResponse.badRequest(
//             res,
//             "Vui lòng điền đầy đủ tài khoản mật khẩu"
//         );
//     }
//     const user = await UserModel.findOne(
//         {
//             username: data.username as SchemaDefinitionProperty<{
//                 type: String;
//                 required: true;
//             }>,
//         },
//         "_id email username password fullname avatar permission"
//     );
//     if (!user) {
//         return HttpResponse.badRequest(res, "Sai tên tài khoản hoặc mật khẩu!");
//     }
//     const match = await bcrypt.compare(data.password, user.password);
//     if (!match) {
//         return HttpResponse.badRequest(res, "Sai tên tài khoản hoặc mật khẩu!");
//     }
//     const token = jwt.sign(
//         {
//             _id: user._id,
//             username: user.username,
//             name: user.fullname,
//         },
//         env.SECRET
//     );
//     user.password = "";
//     HttpResponse.ok(res, {
//         token: token,
//         user: user,
//         message: "ok",
//     });
// }

// async function getProfile(req: Req, res: Res) {
//     HttpResponse.ok(res, req.user);
// }

// async function addPermission(req: Req, res: Res) {
//     const { permission, id } = req.body;
//     if (permission === UserModel.permission.SUPER_ADMIN) {
//         return HttpResponse.badRequest(
//             res,
//             "Không thế thay đổi quyền SUPER ADMIN"
//         );
//     }
//     if (!UserModel.verifyPermission(permission)) {
//         return HttpResponse.badRequest(res, "Quyền này không tồn tại");
//     }
//     const user = await UserModel.findOne(
//         { _id: id },
//         "_id fullname permission"
//     );
//     if (user.permission.includes(permission)) {
//         return HttpResponse.badRequest(
//             res,
//             `Tài khoản này đã được phân quyền ${permission}`
//         );
//     }
//     user.permission.push(permission);
//     user.save();
//     HttpResponse.ok(res, user);
// }

// async function removePermission(req: Req, res: Res) {
//     const { permission, id } = req.body;
//     if (permission === UserModel.permission.SUPER_ADMIN) {
//         return HttpResponse.badRequest(
//             res,
//             "Không thế thay đổi quyền SUPER ADMIN"
//         );
//     }
//     if (!UserModel.verifyPermission(permission)) {
//         return HttpResponse.badRequest(res, "Quyền này không tồn tại");
//     }
//     const user = await UserModel.findByIdAndUpdate(
//         id,
//         {
//             $pull: { permission: permission },
//         },
//         { new: true }
//     ).select("_id fullname permission");
//     HttpResponse.ok(res, user);
// }

// async function getListUser(req: Req, res: Res) {
//     const select = req.query.select || "_id fullname username";
//     const { _id, username, fullname } = req.query;
//     let filter: any = {};
//     _setOption(filter, "_id", _id);
//     _setOption(filter, "username", username);
//     _setOption(filter, "fullname", fullname, true);
//     const users = await UserModel.find(filter, select);
//     HttpResponse.ok(res, users);
// }

// async function getUser(req: Req, res: Res) {
//     const id = req.params.id;
//     const select = req.query.select || "_id fullname username";
//     const user = await UserModel.findById(id, select);
//     HttpResponse.ok(res, user);
// }

// async function editProfile(req: Req, res: Res) {
//     const { fullname, avatar } = req.body;
//     let update: any = {};
//     _setOption(update, "fullname", fullname);
//     _setOption(update, "avatar", avatar);
//     const user = await UserModel.findByIdAndUpdate(req.user._id, update, {
//         new: true,
//     });
//     HttpResponse.ok(res, user);
// }

// async function changePassword(req: Req, res: Res) {
//     const { password, oldPassword } = req.body;
//     if (!password) {
//         return HttpResponse.badRequest(res, "Mật khẩu không được để trống");
//     }
//     const match = await bcrypt.compare(oldPassword, req.user.password);
//     if (!match) {
//         return HttpResponse.badRequest(res, "Mật khẩu cũ không khớp");
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const newPassword = bcrypt.hashSync(password, salt);

//     await UserModel.findByIdAndUpdate(req.user._id, {
//         password: newPassword,
//     });
//     HttpResponse.ok(res, { message: "Thay đổi mật khẩu thành công" });
// }

export default {
    register,
    // login,
    // getProfile,
    // addPermission,
    // removePermission,
    // getListUser,
    // getUser,
    // editProfile,
    // changePassword,
};
