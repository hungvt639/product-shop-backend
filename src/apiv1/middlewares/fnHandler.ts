import { RequestHandler } from "express";
import env from "../../config/env";
import { Req, Res, Next } from "../interfaces/Express";
import { convertCode } from "../utils/functions";

type FnRequestHandler = (req: Req, res: Res, next?: Next) => Promise<any>;

export default (fn: FnRequestHandler): RequestHandler =>
    (req: Req, res: Res, next: Next) => {
        const { method } = req;
        if (method === "GET") {
            const page = req.query.page || env.PAGE_DEFAULT;
            const limit = req.query.limit || env.LIMIT_DEFAULT;
            const search = req.query.search as string;
            const select = req.query.select as string;
            req.querys = {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                search,
                select,
            };
        }

        return fn(req, res, next).catch(next);
    };
