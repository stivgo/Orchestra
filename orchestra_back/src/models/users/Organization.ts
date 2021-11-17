import { ObjectId } from "mongoose"
import ObjectUtils from "../../utils/ObjectUtils"
import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { Validator } from "../../utils/Validator"

export type OrganizationDataType = {
    _id?: ObjectId
    name: string
    website: string
    phoneNumber: string
    twitterUrl: string 
    facebookUrl: string
    nit: string
    country: string
    userIds: ObjectId[]
}

export class Organization {
    
    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'organizations'
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['name', 'website', 'phoneNumber', 'twitterUrl', 'facebookUrl', 'nit', 'country'],
        optionals: ['_id'],
        idArrays: ['userIds']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id?: ObjectId
    public name!: string
    public website!: string
    public phoneNumber!: string
    public twitterUrl!: string 
    public facebookUrl!: string
    public nit!: string
    public country!: string
    public userIds: ObjectId[] = []

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: OrganizationDataType){
        Object.assign(this, data) 
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(): void{
        Validator.validateInstanceOfClass(this, Organization, false)
    }

    public getId(): ObjectId{
        return this._id!
    }

    public hasUser(userId: ObjectId): boolean{
        return this.userIds.some( id => ObjectUtils.compareObjectIds( userId, id ) )

    }

    public hasProject(userId: ObjectId): boolean{
        return this.userIds.some( id => ObjectUtils.compareObjectIds( userId, id ) )
    }

    //-----------------------------------------------------------------------
    // User access methods
    //-----------------------------------------------------------------------

    public addUser(userId: ObjectId): void{
        if ( this.userIds.some( id => ObjectUtils.compareObjectIds( userId, id ) ) ){
            throw Error('The User [' + userId + '] is already a member of the Organization [' + this._id + ']')
        }
        this.userIds.push(userId)
    }
    
    public findUser(userId: ObjectId): ObjectId{
        let searchedUserId = this.userIds.findIndex( it => ObjectUtils.compareObjectIds( userId, it ) )
        ObjectUtils.throwExceptionIfNotExist(this.userIds[ searchedUserId ], 'The User [' + userId + '] does not exist in the Organization [' + this._id + ']')
        return this.userIds[ searchedUserId ]!
    }
        
    public removeUser(deletedId: ObjectId): void{
        let oldSectionIndex = this.userIds.findIndex( it => ObjectUtils.compareObjectIds(deletedId, it) )
        ObjectUtils.throwExceptionIfNotExist( this.userIds[oldSectionIndex], 'The User [' + deletedId + '] does not exist in the Organization [' + this._id + ']' )
        this.userIds.splice(oldSectionIndex, 1)
    }

}