import mongoose from "mongoose";
import Const from "./const";

async function connect() {
    try {
        await mongoose.connect(Const.MONGO_DB);
        console.log("Connect OK");
    } catch (e) {
        console.log("Connect NOT OK");
    }
}
export default connect;
