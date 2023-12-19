import config from "@/lib/config/index.config";
import { Client, Account, ID } from 'appwrite';
import { User } from "../type";

// export const client = new Client();

// client
//     .setEndpoint(config.APP_WRITE_URL)
//     .setProject(config.PROJECT_ID); // Replace with your project ID

// export const account = new Account(client);

export class AuthService {

    client = new Client();
    account: any;
    constructor() {
        this.client
            .setEndpoint(config.APP_WRITE_URL)
            .setProject(config.PROJECT_ID);
        this.account = new Account(this.client)
    }
    //create

    async CreateUser({ name, email, password }: User) {
        try {
            const newUser = await this.account.create(
                ID.unique(),
                name,
                email,
                password
            )
            if (newUser) {
                return this.loginUser({ email, password })
            }

        } catch (err) {
            console.log(err)

        }

    }
    //login

    async loginUser({ email, password }: User) {
        return await this.account.createEmailSession(
            email, password
        )
    }
    //getuser

    async getUser() {
        try {
            return await this.account.get()
        } catch (err) {
            console.log(err)
        }

    }
    //logout

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (err) {
            console.log(err)
        }
    }
}
const authService = new AuthService()
export default authService