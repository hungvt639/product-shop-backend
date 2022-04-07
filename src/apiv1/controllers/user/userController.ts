import { Req, Res } from "../../interfaces/Express";
import HttpResponse from "../../utils/response";
import { removeKeyNull, validArrObjId } from "../../utils/functions";
import { User } from "../../models/user/userModel";
import userService from "../../services/user/userService";

class UserController {
    public async register(req: Req, res: Res) {
        const data = new User(req.body);
        const user = await userService.register(data);
        HttpResponse.ok(res, user);
    }

    public async activateUser(req: Req, res: Res) {
        const { active_token } = req.body;
        if (!active_token)
            return HttpResponse.badRequest(res, "Vui lòng cung cấp token");
        await userService.activateUser(active_token);
        HttpResponse.ok(res, { message: "Kích hoạt tài khoản thành công" });
    }

    public async login(req: Req, res: Res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return HttpResponse.badRequest(
                res,
                "Vui lòng điền đầy đủ tài khoản mật khẩu"
            );
        }
        const value = await userService.login(username, password);
        HttpResponse.ok(res, value);
    }

    public async getProfile(req: Req, res: Res) {
        HttpResponse.ok(res, req.user);
    }

    public async getListUser(req: Req, res: Res) {
        const select = req.query.select || "_id fullname username";
        let filter = removeKeyNull(req.query);
        const users = await userService.getListUser(filter, select);
        HttpResponse.ok(res, users);
    }

    public async getUser(req: Req, res: Res) {
        const id = req.params.id;
        const select = (req.query.select as string) || "_id fullname username";
        const user = await userService.getUser(id, select);
        HttpResponse.ok(res, user);
    }

    public async editProfile(req: Req, res: Res) {
        const { fullname, avatar } = req.body;
        const update = removeKeyNull({ fullname, avatar });
        const user = await userService.editProfile(req.user._id, update);
        HttpResponse.ok(res, user);
    }

    public async changePassword(req: Req, res: Res) {
        const { password, oldPassword } = req.body;
        const { user } = req;
        if (!password) {
            return HttpResponse.badRequest(res, "Mật khẩu không được để trống");
        }
        await userService.changePassword(
            user._id,
            password,
            oldPassword,
            user.password
        );
        HttpResponse.ok(res, { message: "Thay đổi mật khẩu thành công" });
    }

    public async sendResetPassword(req: Req, res: Res) {
        const { param } = req.body;
        if (!param)
            return HttpResponse.badRequest(
                res,
                "Vui lòng nhập username hoặc email của bạn"
            );
        await userService.sendResetPassword(param);
        HttpResponse.ok(res, {
            message:
                "Một tin nhắn đã được gửi tới email của bạn. Vui lòng kiểm tra email và tiến hành cập nhật lại mật khẩu",
        });
    }

    public async resetPassword(req: Req, res: Res) {
        const { password, reset_password_token } = req.body;
        if (!password)
            return HttpResponse.badRequest(res, "Vui lòng nhập mật khẩu mới");
        await userService.resetPassword(password, reset_password_token);
        HttpResponse.ok(res, {
            message: "Thay đổi mật khẩu thành công",
        });
    }

    public async updateGroupUser(req: Req, res: Res) {
        const { groups } = req.body;
        const { id } = req.params;
        if (!validArrObjId(groups)) {
            return HttpResponse.badRequest(
                res,
                "groups không đúng định dạng ObjectId"
            );
        }
        const user = await userService.updateGroupUser(id, groups);
        HttpResponse.ok(res, user);
    }
}

export default new UserController();
