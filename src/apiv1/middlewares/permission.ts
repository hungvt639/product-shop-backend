import { RequestHandler } from "express";
import env from "../../config/env";
import { Req, Res, Next } from "../interfaces/Express";
import { convertCode } from "../utils/functions";
import HttpResponse from "../utils/response";

type FnRequestHandler = (req: Req, res: Res, next?: Next) => Promise<any>;

export const _per =
    (fn: FnRequestHandler, permission: string = undefined): RequestHandler =>
    (req: Req, res: Res, next: Next) => {
        const { method } = req;
        if (method === "GET") {
            const page = req.query.page || env.PAGE_DEFAULT;
            const limit = req.query.limit || env.LIMIT_DEFAULT;
            const search = req.query.search
                ? convertCode(req.query.search as string)
                : "";
            req.querys = {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                search: search,
            };
        }
        if (_hasPer(req.user, permission))
            return fn(req, res, next).catch(next);
        else
            return HttpResponse.badRequest(
                res,
                "Bạn không có quyền truy cập chức năng này"
            );
    };

function _hasPer(user: any, permission: string | undefined) {
    if (!permission) return true;
    for (const group of user.groups) {
        for (const permis of group.permissions) {
            if (permis.code === permission) return true;
        }
    }
    for (const permis of user.permissions) {
        if (permis.code === permission) return true;
    }
    return false;
}
