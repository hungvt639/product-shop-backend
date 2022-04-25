import { Req, Res } from "../../interfaces/Express";
declare class OrderController {
    create(req: Req, res: Res): Promise<void>;
    gets(req: Req, res: Res): Promise<void>;
    getDetail(req: Req, res: Res): Promise<void>;
    update(req: Req, res: Res): Promise<void>;
}
declare const _default: OrderController;
export default _default;
