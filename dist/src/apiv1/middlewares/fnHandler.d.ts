import { RequestHandler } from "express";
import { Req, Res, Next } from "../interfaces/Express";
declare type FnRequestHandler = (req: Req, res: Res, next?: Next) => Promise<any>;
declare const _default: (fn: FnRequestHandler) => RequestHandler;
export default _default;
