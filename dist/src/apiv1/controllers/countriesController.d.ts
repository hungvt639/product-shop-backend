import { Req, Res } from "../interfaces/Express";
declare class CountriesController {
    getProvincials(req: Req, res: Res): Promise<void>;
    getDistricts(req: Req, res: Res): Promise<void>;
    getWards(req: Req, res: Res): Promise<void>;
}
declare const _default: CountriesController;
export default _default;
