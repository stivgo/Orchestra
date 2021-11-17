import { ObjectId } from "mongoose"
import ObjectUtils from "../../utils/ObjectUtils"
import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { Validator } from "../../utils/Validator"

export type CollaboratorDataType = {
    role: string
    permissions: string[]
    userId: ObjectId
}

export class Collaborator{
    
    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['role'],
        stringArrays: ['permissions'],
        ids: ['userId']
    }

    public static P_MODIFY_CONTENT: string = 'Modify content'
    public static P_MODIFY_DATA: string = 'Modify data'
    public static P_WATCH_PROJECT: string = 'Watch project'
    public static P_ADMIN: string = 'Administrator'
    private static ALL_PERMISSIONS: string[] = [Collaborator.P_ADMIN, Collaborator.P_MODIFY_CONTENT, 
        Collaborator.P_MODIFY_DATA, Collaborator.P_WATCH_PROJECT]
    

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public role!: string
    public permissions!: string[] 
    public userId!: ObjectId

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: CollaboratorDataType){
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(): void{
        Validator.validateInstanceOfClass(this, Collaborator, false)
        this.validatePermissions()
    }

    public compareByUserId(otherUserId: ObjectId): boolean{
        return ObjectUtils.compareObjectIds( this.userId, otherUserId )
    }

    public getUserId(): ObjectId{
        return this.userId
    }

    public hasPermission(permission: string): boolean{
        if ( this.permissions.includes( Collaborator.P_ADMIN ) ){
            return true
        }
        const index = this.permissions.findIndex( (it) => it === permission )
        return index > -1
    }

    private validatePermissions(): void {
        this.permissions.forEach( itPer => {
            if (!Collaborator.ALL_PERMISSIONS.includes( itPer )){
                throw Error('The permission [' + itPer + '] is not alllowed, the only possible values are '
                    + Collaborator.ALL_PERMISSIONS )
            }
        })       
    }
}