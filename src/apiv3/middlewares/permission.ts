// import { Req, Res, Next } from "../interfaces/Express";
// import UserModel, { UserInterface } from "../models/user";
// import HttpResponse from "../utils/response";

// function _hasPermission(user: UserInterface | undefined, permission: string) {
//     if (user?.permission.includes(permission)) return true;
//     return false;
// }

// function _permission(req: Req, res: Res, next: Next, permission: string) {
//     const { user } = req;
//     if (_hasPermission(user, permission)) {
//         next();
//     } else {
//         HttpResponse.badRequest(
//             res,
//             "Bạn không có quyền truy cập chức năng này"
//         );
//     }
// }

// export function _User(req: Req, res: Res, next: Next) {
//     _permission(req, res, next, UserModel.permission.USER);
// }

// export function _Admin(req: Req, res: Res, next: Next) {
//     _permission(req, res, next, UserModel.permission.ADMIN);
// }

// export function _SuperAdmin(req: Req, res: Res, next: Next) {
//     _permission(req, res, next, UserModel.permission.SUPER_ADMIN);
// }
