import { z } from "zod";
import bcrypt from "bcryptjs";
import { createUser } from "@/db/user";
import { connect } from "@/lib/mongo";

const userCreateSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export async function POST(req: Request) {
    const res = await req.json();

    const userData = userCreateSchema.safeParse(res);

    if(!userData.success) {
        return Response.json(userData.error.issues);
    }

    await connect();

    const hashedPassword = await bcrypt.hash(userData.data.password, 8);

    await createUser({
        ...res,
        password: hashedPassword
    });

    return Response.json({
        data: `User ${userData.data.name} created`
    });
}