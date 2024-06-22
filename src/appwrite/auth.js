import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite"
import { toast } from "react-toastify";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Call another method
                toast.success('User Registered Succesfull.')
                return await this.login(email,password)
            }
            else {
                return userAccount
            }
        } catch (error) {
            toast.error(`Registration Error! ${error}`)
            console.log("Appwrite Service :: createAccout Error :: ",error)
        }
    }

    async login({ email, password }) {
        try {
            const res =  await this.account.createEmailPasswordSession(email,password)
            toast.success("Login Successfull.")
            return res;
        } catch (error) {
            toast.error(`Login Error! ${error}`)
            console.log("Appwrite Serviece :: login User :: ", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser Error :: ",error)
        }

        return null;
    }

    async logout() {
        try {
            const res = await this.account.deleteSessions();
            toast.success('Logout Successfull.')
            return res;
        } catch (error) {
            toast.error(`Logout Error! ${error}`)
            console.log("Appwrite Service :: logout Error :: ",error)
        }
    }
}

const authService = new AuthService();

export default authService;