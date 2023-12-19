import accountService from "@/lib/appwrite/services/auth.service"
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
//appwrite
import { ID } from "appwrite";
export interface User {
    name: string;
    email: string;
    password: string
}
export const POST = async (req: NextApiRequest) => {
    let passedValue = await new Response(req.body).text();
    let bodyreq = JSON.parse(passedValue);
    const { name, email, password } = bodyreq;
    if (!name || !email || !password) return NextResponse.json({ status: 400, message: 'Missing required fields' });
    else {
        try {
            const newUser = await accountService.account.create(
                ID.unique(),
                name,
                email,
                password
            )
            return NextResponse.json(newUser)

        } catch (err) {
            return NextResponse.error()
        }
    }

}