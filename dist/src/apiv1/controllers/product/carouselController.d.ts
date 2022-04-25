import { Req, Res } from "../../interfaces/Express";
declare class CarouselController {
    create(req: Req, res: Res): Promise<void>;
    gets(req: Req, res: Res): Promise<void>;
    del(req: Req, res: Res): Promise<void>;
    edit(req: Req, res: Res): Promise<void>;
}
declare const _default: CarouselController;
export default _default;
