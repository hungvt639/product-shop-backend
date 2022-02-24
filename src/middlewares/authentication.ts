import jwt from "jsonwebtoken";
import Config from "../config/const";
import { Next, Req, Res } from "../interfaces/Express";
import UserModel, { UserInterface } from "../models/userModel";
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
        jwt.verify(tokens[1], Config.SECRET, async (err, payload) => {
            if (payload) {
                await UserModel.findById(
                    payload._id,
                    "_id email username password fullname avatar permission"
                )
                    .exec()
                    .then((user: UserInterface) => {
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
