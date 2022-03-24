import { Next, Req, Res } from "../interfaces/Express";
import HttpResponse from "../utils/response";

const role = (req: Req, res: Res, next: Next) => {
    const { method, baseUrl, user } = req;
    if (_hasPermission(user, method, baseUrl)) next();
    else
        HttpResponse.forbidden(
            res,
            "Bạn không có quyền truy cập chức năng này"
        );
};

export default role;

function _hasPermission(user: any, method: String, baseUrl: String) {
    if (!user) return true;
    for (const group of user.groups) {
        for (const permission of group.permissions) {
            if (
                permission.url.startsWith(baseUrl) &&
                permission.method === method
            )
                return true;
        }
    }
    return false;
}
