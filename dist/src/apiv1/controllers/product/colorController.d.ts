import { Req, Res } from "../../interfaces/Express";
declare class ColorController {
    create(req: Req, res: Res): Promise<void>;
    gets(req: Req, res: Res): Promise<void>;
    del(req: Req, res: Res): Promise<void>;
    edit(req: Req, res: Res): Promise<void>;
}
declare const _default: ColorController;
export default _default;
