import mongoose from "mongoose";
import env from "./env";

async function connect() {
    await mongoose.connect(env.MONGO_DB);
    console.log("Connect OK");
}
export default connect;
