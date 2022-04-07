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
}

export default new FileController();
