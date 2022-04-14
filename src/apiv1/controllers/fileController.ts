import { Req, Res } from "../interfaces/Express";
import fileService from "../services/fileService";
import HttpResponse from "../utils/response";
import envV1 from "../config/_envV1";

class FileController {
    public async uploadImgUr(req: Req, res: Res) {
        const file = req.file;
        if (!file) throw new Error("Không có file tải lên");

        const mimetype = file.mimetype;
        if (!envV1.MIMETYPEs.includes(mimetype.toLowerCase()))
            throw new Error("Không hỗ trợ loại file này");
        const data = await fileService.uploadImgUr(file);

        HttpResponse.ok(res, data);
    }

    public async uploadImgUrCK(req: Req, res: Res) {
        const file = req.file;
        if (!file) throw new Error("Không có file tải lên");

        const mimetype = file.mimetype;
        if (!envV1.MIMETYPEs.includes(mimetype.toLowerCase()))
            throw new Error("Không hỗ trợ loại file này");
        const data = await fileService.uploadImgUr(file);
        const response = { uploaded: true, url: data.link };
        HttpResponse.ok(res, response);
    }
}

export default new FileController();
