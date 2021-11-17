import { ObjectId } from "mongoose"
import { DatabaseManager, IdType } from "./DatabaseManager"

export default class ObjectUtils{

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------
    
    static parseClassObjectArray<T, U>(data: any[], Class: new(data:T) => U): U[]{
        return data.map( e => new Class(e) )
    }

    public static throwExceptionIfNotExist(result: any, errorMessage?: string): void{
        if ( result === undefined || result === null ){
            const message = (errorMessage) ? errorMessage : 'The resource does not exist'
            throw new Error(message)
        }
    }

    public static getIdAsObjectId(objectId: IdType): ObjectId{
        if ( typeof objectId === 'string' ){
            return DatabaseManager.generateObjectId(objectId)
        }
        return objectId
    }

    public static compareObjectIds(obj1: ObjectId, obj2: ObjectId): boolean{
        return obj1.toString() === obj2.toString()
    }

    public static compareIds(id1: IdType, id2: IdType): boolean{
        return this.compareObjectIds( this.getIdAsObjectId(id1), this.getIdAsObjectId(id2) )
    }

}