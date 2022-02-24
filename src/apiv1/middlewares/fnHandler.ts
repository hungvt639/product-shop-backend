import { RequestHandler } from "express";
import Const from "../../config/const";
import { Req, Res, Next } from "../interfaces/Express";
import { _removeAccents } from "../utils/functions";

type FnRequestHandler = (req: Req, res: Res, next?: Next) => Promise<any>;

export default (fn: FnRequestHandler): RequestHandler =>
    (req: Req, res: Res, next: Next) => {
        const { method } = req;
        if (method === "GET") {
            const page = req.query.page || Const.PAGE_DEFAULT;
            const limit = req.query.limit || Const.LIMIT_DEFAULT;
            const search = req.query.search
                ? _removeAccents(req.query.search as string)
                : "";
            req.querys = {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                search: search,
            };
        }

        return fn(req, res, next).catch(next);
    };
