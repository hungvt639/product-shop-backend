import mongoose from "mongoose";
import env from "./env";

async function connect() {
    try {
        await mongoose.connect(env.MONGO_DB);
        console.log("Connect OK");
    } catch (e) {
        console.log("Connect NOT OK");
    }
}
export default connect;
