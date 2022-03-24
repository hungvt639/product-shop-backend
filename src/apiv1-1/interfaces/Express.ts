import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export interface Req extends Request {
    user?: User;
    querys?: {
        page: number;
        limit: number;
        search: string;
    };
}
export interface Res extends Response {}

export interface Next extends NextFunction {}
