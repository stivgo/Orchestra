import { User, UserDataType } from "../models/users/User";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import * as bcrypt from 'bcrypt'

//TODO: Check the authorization for User
export class UserController{

    //-----------------------------------------------------------------------
    // Static attributes
    //-----------------------------------------------------------------------

    private static DATA_PROJECTION: any = {password: 0}

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    public static async createUser(data: any): Promise<User>{
        const defaultData = this.getDataFromCreateRequest(data)
        ObjectUtils.throwExceptionIfNotExist(defaultData.password, "The field password is undefined")
        defaultData.password = this.encryptPassword( defaultData.password! )
        const newUser = new User(defaultData)
        newUser.validate()
        await this.checkIfEmailIsAlreadyUsed(defaultData.email, false)
        let createdUserData = await DatabaseManager.createDocument(User.COLLECTION, newUser)
        delete createdUserData['password']
        return new User(createdUserData)
    }

    public static async findUserById(userId: IdType): Promise<User>{
        const user = await DatabaseManager.findProjectedDocumentById(User.COLLECTION, userId, this.DATA_PROJECTION, User)
        ObjectUtils.throwExceptionIfNotExist( user, 'The user [' + userId + '] was not found' )
        return user
    }

    public static async findUserByEmail(email: string): Promise<User>{
        email = email.toLowerCase()
        return await this.checkIfEmailIsAlreadyUsed(email, true)
    }

    public static async findUserByEmailAndPassword(email: string, password: string): Promise<User>{
        await this.checkIfEmailIsAlreadyUsed(email, true)
        const user: UserDataType = (await DatabaseManager.findDocumentsByQuery( User.COLLECTION, {email} ))[0] as UserDataType
        if ( !this.comparePasswords(user.password!, password) ){
            throw Error('The password is incorrect')
        }
        delete user.password
        return new User(user)
    }

    public static async findUsersById(userIds: IdType[]): Promise<User[]>{
        const query = {_id: {$in: userIds}}
        const users = await DatabaseManager.findProjectedDocumentsByQuery(User.COLLECTION, query, this.DATA_PROJECTION, User)
        ObjectUtils.throwExceptionIfNotExist( users, 'The users ' + userIds + ' were not found' )
        return users
    }

    public static async updateUserFromExternalRequest(requesterUser :IdType, data: any): Promise<User>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        if ( !ObjectUtils.compareIds(requesterUser, data._id) ){
            throw Error('The user [' + requesterUser + '] does not have access to modify the User [' + data._id + '] data')
        }
        const user = await this.findUserById(data._id!)
        const updatedUserData = this.getDataFromUpdateRequest(data, user)
        const updatedUser = new User(updatedUserData)
        return await this.updateUser(updatedUser)
    }

    public static async updateUser(updatedUser: User): Promise<User>{
        updatedUser.validate()
        delete updatedUser.password
        await DatabaseManager.updateDocumentById(User.COLLECTION, updatedUser.getId(), updatedUser )
        return updatedUser
    }

    public static async deleteUser(id: IdType): Promise<void>{
        await DatabaseManager.deleteDocument(User.COLLECTION, id)
    }

    //-----------------------------------------------------------------------
    // Support Methods
    //-----------------------------------------------------------------------

    private static encryptPassword(password: string){
        return bcrypt.hashSync(password, 10)
    }

    private static comparePasswords(actualEncryptedPassword: string, plainPassword: string): boolean{
        return bcrypt.compareSync(plainPassword, actualEncryptedPassword)
    }

    private static async checkIfEmailIsAlreadyUsed(email: string, shouldExist: boolean): Promise<User>{
        const users = await DatabaseManager.findProjectedDocumentsByQuery( User.COLLECTION, {email}, this.DATA_PROJECTION, User )
        if ( users.length > 1 ){
            throw Error('Internal Error: there is more than one User with the email [' + email + ']')
        }
        if ( users.length === 0 && shouldExist ){
            throw Error('The User with the email [' + email + '] was not found')
        }
        else if ( users.length === 1 && !shouldExist ){
            throw Error('The Email [' + email + '] is already used by another User')
        }
        return users[0]
    }

    private static getDataFromCreateRequest(data: any): UserDataType{
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email.trim().toLowerCase(),
            password: data.password
        }
    }

    private static getDataFromUpdateRequest(newData: any, originalUser: User): UserDataType{
        const originalUserData = originalUser as unknown as UserDataType
        return {
            ...originalUserData,
            firstName: newData.firstName,
            lastName: newData.lastName,
        }
    }

}