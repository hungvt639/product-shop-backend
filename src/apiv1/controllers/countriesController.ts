import { Req, Res } from "../interfaces/Express";
import HttpResponse from "../utils/response";
import SubVN from "sub-vn";

class CountriesController {
    public async getProvincials(req: Req, res: Res) {
        const datas = SubVN.getProvinces();
        HttpResponse.ok(res, datas);
    }
    public async getDistricts(req: Req, res: Res) {
        const { province } = req.params;
        const datas = SubVN.getDistrictsByProvinceCode(province);
        HttpResponse.ok(res, datas);
    }
    public async getWards(req: Req, res: Res) {
        const { district } = req.params;
        const datas = SubVN.getWardsByDistrictCode(district);
        HttpResponse.ok(res, datas);
    }
}

export default new CountriesController();
