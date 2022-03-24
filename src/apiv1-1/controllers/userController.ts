import { Req, Res } from "../interfaces/Express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { SchemaDefinitionProperty, ObjectId } from "mongoose";
import HttpResponse from "../utils/response";
import { removeKeyNull, setOption, validArrObjId } from "../utils/functions";
import UserModel, { User } from "../models/userModel";
import SendMail from "../utils/sendEmail";
import GroupModel from "../models/groupModel";
import { GROUP } from "../config/data";

async function register(req: Req, res: Res) {
    const data = new User(req.body);
    const group = await GroupModel.findOne({ name: GROUP.user.name });
    const user = await UserModel.create(data);
    user.groups.push(group._id);
    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.fullname,
        },
        env.SECRET_ACTIVATE_USER,
        { expiresIn: "7d" }
    );

    await SendMail({
        to: data.email as string,
        subject: "Kích hoạt tài khoản!",
        template: "activate-user",
        context: {
            fullname: data.fullname as string,
            href: `${env.FRONTEND}/${env.ROUTER_ACTIVATE_USER}?${env.KEY_ACTIVATE_USER}=${token}`,
        },
    });

    await user.save();
    user.password = "";
    HttpResponse.ok(res, user);
}

async function activateUser(req: Req, res: Res) {
    const { active_token } = req.body;
    if (!active_token)
        return HttpResponse.badRequest(res, "Vui lòng cung cấp token");
    jwt.verify(active_token, env.SECRET_ACTIVATE_USER, async (err, payload) => {
        if (err) {
            HttpResponse.badRequest(res, err.message);
        } else {
            try {
                await UserModel.findByIdAndUpdate(
                    payload._id,
                    { isActivate: true },
                    { new: true }
                ).select("_id");
                HttpResponse.ok(res, {
                    message: "Kích hoạt tài khoản thành công",
                });
            } catch (e) {
                HttpResponse.badRequest(res, e.message);
            }
        }
    });
}

async function login(req: Req, res: Res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return HttpResponse.badRequest(
            res,
            "Vui lòng điền đầy đủ tài khoản mật khẩu"
        );
    }
    const user = await UserModel.findOne(
        {
            username: username as SchemaDefinitionProperty<{
                type: String;
                required: true;
            }>,
        },
        "_id email username password fullname avatar permission isActivate"
    );

    if (!user) {
        return HttpResponse.badRequest(res, "Sai tên tài khoản hoặc mật khẩu!");
    }
    if (!user.isActivate) {
        return HttpResponse.badRequest(res, "Tài khoản chưa được kích hoạt");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return HttpResponse.badRequest(res, "Sai tên tài khoản hoặc mật khẩu!");
    }
    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
            name: user.fullname,
        },
        env.SECRET
    );
    user.password = "";
    HttpResponse.ok(res, {
        token: token,
        user: user,
        message: "ok",
    });
}

async function getProfile(req: Req, res: Res) {
    HttpResponse.ok(res, req.user);
}

async function addPermission(req: Req, res: Res) {
    const { permission, id } = req.body;
    // if (permission === UserModel.permission.SUPER_ADMIN) {
    //     return HttpResponse.badRequest(
    //         res,
    //         "Không thế thay đổi quyền SUPER ADMIN"
    //     );
    // }
    if (!UserModel.verifyPermission(permission)) {
        return HttpResponse.badRequest(res, "Quyền này không tồn tại");
    }
    const user = await UserModel.findOne(
        { _id: id },
        "_id fullname permission"
    );
    // if (user.permission.includes(permission)) {
    //     return HttpResponse.badRequest(
    //         res,
    //         `Tài khoản này đã được phân quyền ${permission}`
    //     );
    // }
    // user.permission.push(permission);
    user.save();
    HttpResponse.ok(res, user);
}

async function removePermission(req: Req, res: Res) {
    const { permission, id } = req.body;
    // if (permission === UserModel.permission.SUPER_ADMIN) {
    //     return HttpResponse.badRequest(
    //         res,
    //         "Không thế thay đổi quyền SUPER ADMIN"
    //     );
    // }
    if (!UserModel.verifyPermission(permission)) {
        return HttpResponse.badRequest(res, "Quyền này không tồn tại");
    }
    const user = await UserModel.findByIdAndUpdate(
        id,
        {
            $pull: { permission: permission },
        },
        { new: true }
    ).select("_id fullname permission");
    HttpResponse.ok(res, user);
}

async function getListUser(req: Req, res: Res) {
    const select = req.query.select || "_id fullname username";
    let filter = removeKeyNull(req.query);
    const users = await UserModel.find(filter, select);
    HttpResponse.ok(res, users);
}

async function getUser(req: Req, res: Res) {
    const id = req.params.id;
    console.log("id", id);

    const select = (req.query.select as string) || "_id fullname username";
    let user = await UserModel.findById(id, select);
    if (select.includes("groups")) {
        user = await user.populate({
            path: "groups",
            populate: { path: "permissions" },
        });
    }
    HttpResponse.ok(res, user);
}

async function editProfile(req: Req, res: Res) {
    const { fullname, avatar } = req.body;
    let update: any = {};
    setOption(update, "fullname", fullname);
    setOption(update, "avatar", avatar);
    const user = await UserModel.findByIdAndUpdate(req.user._id, update, {
        new: true,
    });
    HttpResponse.ok(res, user);
}

async function changePassword(req: Req, res: Res) {
    const { password, oldPassword } = req.body;
    if (!password) {
        return HttpResponse.badRequest(res, "Mật khẩu không được để trống");
    }
    const match = await bcrypt.compare(oldPassword, req.user.password);
    if (!match) {
        return HttpResponse.badRequest(res, "Mật khẩu cũ không khớp");
    }
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    await UserModel.findByIdAndUpdate(req.user._id, {
        password: newPassword,
    });
    HttpResponse.ok(res, { message: "Thay đổi mật khẩu thành công" });
}

async function sendResetPassword(req: Req, res: Res) {
    const { param } = req.body;
    if (!param)
        return HttpResponse.badRequest(
            res,
            "Vui lòng nhập username hoặc email của bạn"
        );
    const user = await UserModel.findOne(
        { $or: [{ username: param }, { email: param }] },
        "_id username email fullname"
    );
    if (!user)
        return HttpResponse.badRequest(
            res,
            "Không tìm thấy tài khoản nào có username hoặc email là " + param
        );
    const now = Date.now();
    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.fullname,
            time: now,
        },
        env.SECRET_RESET_PASSWORD,
        { expiresIn: "5m" }
    );

    await SendMail({
        to: user.email as string,
        subject: "Khôi phục mật khẩu!",
        template: "reset-password",
        context: {
            fullname: user.fullname as string,
            href: `${env.FRONTEND}/${env.ROUTER_RESET_PASSWORD}?${env.KEY_RESET_PASSWORD}=${token}`,
        },
    });
    user.timeResetPassword = now;
    await user.save();
    HttpResponse.ok(res, {
        message:
            "Một tin nhắn đã được gửi tới email của bạn. Vui lòng kiểm tra email và tiến hành cập nhật lại mật khẩu",
    });
}

async function resetPassword(req: Req, res: Res) {
    const { password, reset_password_token } = req.body;
    if (!password)
        return HttpResponse.badRequest(res, "Vui lòng nhập mật khẩu mới");
    jwt.verify(
        reset_password_token,
        env.SECRET_RESET_PASSWORD,
        async (err, payload) => {
            if (err) {
                HttpResponse.badRequest(res, err.message);
            } else {
                try {
                    const user = await UserModel.findById(
                        payload._id,
                        "_id password timeResetPassword"
                    );
                    if (!user)
                        return HttpResponse.badRequest(
                            res,
                            "Không tìm thấy người dùng"
                        );
                    if (user.timeResetPassword !== payload.time)
                        return HttpResponse.badRequest(
                            res,
                            "Vui lòng cung cấp token mới nhất"
                        );
                    const salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(password, salt);
                    user.timeResetPassword = 0;
                    await user.save();
                    HttpResponse.ok(res, {
                        message: "Thay đổi mật khẩu thành công",
                    });
                } catch (e) {
                    HttpResponse.badRequest(res, e.message);
                }
            }
        }
    );
}

async function updateGroupUser(req: Req, res: Res) {
    const { groups } = req.body;
    const { id } = req.params;
    const user = await UserModel.findById(id, "_id fullname username groups");
    if (!validArrObjId(groups)) {
        return HttpResponse.badRequest(
            res,
            "groups không đúng định dạng ObjectId"
        );
    }
    if (!user)
        return HttpResponse.badRequest(
            res,
            "Không tìm thấy người dùng nào có id là: " + id
        );
    const grs = await GroupModel.find({
        _id: { $in: groups },
    });
    if (grs.length !== groups.length) {
        const grErr = groups.filter(
            (gr: string) => !grs.filter((g) => g._id == gr).length
        );
        return HttpResponse.badRequest(
            res,
            `Không tìm thấy Group có id là ${grErr}`
        );
    }
    const grIds = grs.map((p) => p._id);
    user.groups = grIds;
    await user.save();
    const u = await user.populate({
        path: "groups",
        populate: { path: "permissions" },
    });
    HttpResponse.ok(res, u);
}

export default {
    register,
    activateUser,
    login,
    getProfile,
    addPermission,
    removePermission,
    getListUser,
    getUser,
    editProfile,
    changePassword,
    sendResetPassword,
    resetPassword,
    updateGroupUser,
};
