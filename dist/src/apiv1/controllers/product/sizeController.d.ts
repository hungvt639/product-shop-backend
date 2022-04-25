import { Req, Res } from "../../interfaces/Express";
declare class SizeController {
    create(req: Req, res: Res): Promise<void>;
    gets(req: Req, res: Res): Promise<void>;
    del(req: Req, res: Res): Promise<void>;
}
declare const _default: SizeController;
export default _default;
