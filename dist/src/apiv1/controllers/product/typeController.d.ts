import { Req, Res } from "../../interfaces/Express";
declare class TypeController {
    create(req: Req, res: Res): Promise<void>;
    gets(req: Req, res: Res): Promise<void>;
    del(req: Req, res: Res): Promise<void>;
    edit(req: Req, res: Res): Promise<void>;
    getsProducts(req: Req, res: Res): Promise<void>;
    get(req: Req, res: Res): Promise<void>;
}
declare const _default: TypeController;
export default _default;
