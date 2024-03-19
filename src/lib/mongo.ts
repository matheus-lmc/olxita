import mongoose from "mongoose";

export async function connect() {
    const uri = process.env.MONGODB_URL;

    if(!uri) {
        throw new Error("No mongodb url found in enviroment");
    }

    await mongoose.connect(uri).catch(console.log);
    console.log("Client connected");
}