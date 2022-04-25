import { Request, Response, NextFunction } from "express";
import { User } from "../models/user/userModel";
export interface Req extends Request {
    user?: User;
    querys?: Querys;
}
export interface Querys {
    page: number;
    limit: number;
    search: string;
    select: string;
}
export interface Res extends Response {
}
export interface Next extends NextFunction {
}
