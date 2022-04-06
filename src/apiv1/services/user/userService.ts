import { Req, Res } from "../../interfaces/Express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../../config/env";
import { SchemaDefinitionProperty } from "mongoose";
import UserModel, { User } from "../../models/user/userModel";
import SendMail from "../../utils/sendEmail";
import GroupModel from "../../models/user/groupModel";
import { GROUP } from "../../config/data";
import envV1 from "../../config/_envV1";

async function register(data: User) {
    const group = await GroupModel.findOne({ name: GROUP.user.name });
    if (!group) throw new Error("Không tìm thấy group " + GROUP.user.name);
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
            href: `${env.FRONTEND}/${envV1.r.activate_user}?${envV1.query.active_token}=${token}`,
        },
    });
    await user.save();
    user.password = "";
    return user;
}

async function activateUser(active_token: string) {
    const payload: any = jwt.verify(active_token, env.SECRET_ACTIVATE_USER);
    const user = await UserModel.findByIdAndUpdate(
        payload._id,
        { isActivate: true },
        { new: true }
    ).select("_id");
    if (!user) throw new Error("User không tồn tại");
}

async function login(username: string, password: string) {
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
        throw new Error("Sai tên tài khoản hoặc mật khẩu!");
    }
    if (!user.isActivate) {
        throw new Error("Tài khoản chưa được kích hoạt");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Sai tên tài khoản hoặc mật khẩu!");
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
    return {
        token: token,
        user: user,
        message: "ok",
    };
}

async function getListUser(filter, select) {
    const users = await UserModel.find(filter, select);
    return users;
}

async function getUser(id, select) {
    let user = await UserModel.findById(id, select);
    if (select.includes("groups")) {
        user = await user.populate({
            path: "groups",
            populate: { path: "permissions" },
        });
    }
    return user;
}

async function editProfile(_id, update) {
    return await UserModel.findByIdAndUpdate(_id, update, {
        new: true,
    });
}

async function changePassword(_id, password, oldPassword, pass) {
    const match = await bcrypt.compare(oldPassword, pass);
    if (!match) {
        throw new Error("Mật khẩu cũ không khớp");
    }
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    await UserModel.findByIdAndUpdate(_id, {
        password: newPassword,
    });
}

async function sendResetPassword(param: string) {
    const user = await UserModel.findOne(
        { $or: [{ username: param }, { email: param }] },
        "_id username email fullname"
    );
    if (!user)
        throw new Error(
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
            href: `${env.FRONTEND}/${envV1.r.reset_password}?${envV1.query.reset_password_token}=${token}`,
        },
    });
    user.timeResetPassword = now;
    await user.save();
}

async function resetPassword(password, reset_password_token) {
    const payload: any = jwt.verify(
        reset_password_token,
        env.SECRET_RESET_PASSWORD
    );
    const user = await UserModel.findById(
        payload._id,
        "_id password timeResetPassword"
    );
    if (!user) throw new Error("Không tìm thấy người dùng");
    if (user.timeResetPassword !== payload.time)
        throw new Error("Vui lòng cung cấp token mới nhất");
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    user.timeResetPassword = 0;
    await user.save();
}

async function updateGroupUser(id, groups) {
    const user = await UserModel.findById(id, "_id fullname username groups");
    if (!user) throw new Error("Không tìm thấy người dùng nào có id là: " + id);
    const grs = await GroupModel.find({
        _id: { $in: groups },
    });
    if (grs.length !== groups.length) {
        const grErr = groups.filter(
            (gr: string) => !grs.filter((g) => g._id == gr).length
        );
        throw new Error(`Không tìm thấy Group có id là ${grErr}`);
    }
    const grIds = grs.map((p) => p._id);
    user.groups = grIds;
    await user.save();
    const u = await user.populate({
        path: "groups",
        populate: { path: "permissions" },
    });
    return u;
}
export default {
    register,
    activateUser,
    login,
    getListUser,
    getUser,
    editProfile,
    changePassword,
    sendResetPassword,
    resetPassword,
    updateGroupUser,
};
