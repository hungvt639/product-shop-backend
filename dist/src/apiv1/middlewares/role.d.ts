import { Next, Req, Res } from "../interfaces/Express";
declare const role: (req: Req, res: Res, next: Next) => void;
export default role;
