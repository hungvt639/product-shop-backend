import mongoose from "mongoose";
import Config from "./const";

async function connect() {
    try {
        await mongoose.connect(Config.MONGO_DB);
        console.log("Connect OK");
    } catch (e) {
        console.log("Connect NOT OK");
    }
}
export default connect;
