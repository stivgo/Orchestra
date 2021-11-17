import { JwtManager } from "../utils/JwtManager";
import { UserController } from "./UserController";

export type UserLoginData = {
    email: string
    password: string
}

export class AuthenticationController{

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    static async login(userData: UserLoginData): Promise<any>{
        userData.email = userData.email.trim().toLocaleLowerCase()
        const user = await UserController.findUserByEmailAndPassword( userData.email, userData.password )
        //TODO: Check how to store the session
        return {
            token: JwtManager.createToken( user.getId() ),
            userId: user.getId()
        }
    }

    static async logout(token: string): Promise<void>{
        JwtManager.getDataFromToken(token)
    }

}