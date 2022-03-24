import jwt from "jsonwebtoken";
import env from "../../config/env";
import { Next, Req, Res } from "../interfaces/Express";
import UserModel, { User } from "../models/userModel";
import HttpResponse from "../utils/response";

const auth = (req: Req, res: Res, next: Next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return HttpResponse.unauthorizer(
            res,
            "Vui lòng đăng nhập để sử dụng chức năng này!"
        );
    }
    const tokens = bearerToken.split(" ");
    if (tokens[0] !== "Bearer") {
        return HttpResponse.unauthorizer(res, "Token is not valid");
    } else {
        jwt.verify(tokens[1], env.SECRET, async (err, payload) => {
            if (!err) {
                await UserModel.getProfile(
                    payload._id,
                    "_id email username fullname avatar"
                )
                    .exec()
                    .then((user: User) => {
                        if (user) {
                            req.user = user;
                            next();
                        } else {
                            HttpResponse.unauthorizer(
                                res,
                                "Không tồn tại tài khoản này"
                            );
                        }
                    })
                    .catch((err) => {
                        return HttpResponse.unauthorizer(res, err.message);
                    });
            } else {
                return HttpResponse.unauthorizer(res, err.message);
            }
        });
    }
};

export default auth;
