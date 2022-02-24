import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../models/userModel";

export interface Req extends Request {
    user?: UserInterface;
    querys?: {
        page: number;
        limit: number;
        search: string;
    };
}
export interface Res extends Response {}

export interface Next extends NextFunction {}
