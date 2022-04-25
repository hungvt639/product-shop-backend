import { Req, Res } from "../interfaces/Express";
declare class FileController {
    uploadImgUr(req: Req, res: Res): Promise<void>;
    uploadImgUrCK(req: Req, res: Res): Promise<void>;
}
declare const _default: FileController;
export default _default;
