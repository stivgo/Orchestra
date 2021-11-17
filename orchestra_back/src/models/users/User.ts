import { ObjectId } from "mongoose"
import ObjectUtils from "../../utils/ObjectUtils"
import { Validator } from "../../utils/Validator"

export type UserDataType = {
    _id?: ObjectId
    firstName: string
    lastName: string
    email: string
    password?: string
}

export class User{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION = 'users'
    public static REQUIRED_ATTRIBUTES = {
        strings: ['firstName', 'lastName', 'email'],
        optionals: ['_id', 'password']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id?: ObjectId
    public firstName!: string
    public lastName!: string
    public email!: string
    public password?: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: UserDataType){
        Object.assign( this, data )
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(){
        Validator.validateInstanceOfClass(this, User, false)
    }

    public compareById(otherId: ObjectId): boolean{
        return ObjectUtils.compareObjectIds(this._id!, otherId)
    }

    public getId(): ObjectId{
        return this._id!
    }
}