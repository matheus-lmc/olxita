import { Schema, model, Model } from "mongoose";

interface IUser { 
    name: string;
    email: string;
    password: string;
};

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = model<IUser>("user", userSchema);

export async function createUser(data: IUser) {
    const newUser = new UserModel(data);
    await newUser.save();
}