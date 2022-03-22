import jwt from "jsonwebtoken";
import env from "../../config/env";
import { Next, Req, Res } from "../interfaces/Express";
import UserModel, { User } from "../models/userModel";
import HttpResponse from "../utils/response";

const auth = (req: Req, res: Res, next: Next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        HttpResponse.unauthorizer(
            res,
            "Vui lòng đăng nhập để sử dụng chức năng này!"
        );
    }
    const tokens = bearerToken.split(" ");
    if (tokens[0] !== "Bearer") {
        HttpResponse.unauthorizer(res, "Token is not valid");
    } else {
        jwt.verify(tokens[1], env.SECRET, async (err, payload) => {
            if (payload) {
                await UserModel.getProfile(
                    payload._id,
                    "_id email username fullname avatar"
                )
                    .exec()
                    .then((user: User) => {
                        req.user = user;
                        next();
                    })
                    .catch((err) => {
                        HttpResponse.unauthorizer(res, err.message);
                    });
            } else {
                HttpResponse.unauthorizer(res, err.message);
            }
        });
    }
};

export default auth;
