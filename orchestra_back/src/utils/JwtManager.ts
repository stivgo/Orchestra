import * as jwt from 'jsonwebtoken';
import { ConfigurationType } from "../config/ConfigurationType";
import { IdType } from "./DatabaseManager";

const Configuration: ConfigurationType = require('../config/Configuration')

export class JwtManager{

    private static SECRET_KEY = Configuration.JWT_SECRET_KEY
    private static TOKEN_OPTIONS = {
        expiresIn: '100d'
    }

    public static createToken(userId: IdType): string{
        return jwt.sign( {userId}, this.SECRET_KEY, this.TOKEN_OPTIONS)
    }

    public static getDataFromToken(tokenHeader: string): any{
        const token: string = tokenHeader.split(" ")[1]
        if ( !token ){
            throw Error( "The token is not defined" )
        }
        return jwt.verify(token, this.SECRET_KEY)
    }

    public static getUserDataFromTokenInRequest(req: any): IdType{
        const tokenHeader = req.headers.authorization
        if ( tokenHeader ){
            try{
                return this.getDataFromToken(tokenHeader).userId
            }
            catch(error){
                throw Error('Error in jwt: ' + error.message)
            }
        }
        throw Error('The request does not have the authorization header')
    }
    
}