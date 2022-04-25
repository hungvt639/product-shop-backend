import { Next, Req, Res } from "../interfaces/Express";
declare const auth: (req: Req, res: Res, next: Next) => void;
export declare const checkAuth: (req: Req, res: Res, next: Next) => Promise<true | void>;
export default auth;
