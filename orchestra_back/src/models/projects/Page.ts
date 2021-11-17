import { ObjectId } from "mongoose";
import ObjectUtils from "../../utils/ObjectUtils";
import { RequiredAttributes } from "../../utils/RequiredAttributes";
import { Validator } from "../../utils/Validator";

export type PageDataType = {
    _id?: ObjectId
    name: string
    description: string
    number: number
    startTime: number
    endTime: number
}

export class Page{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['name', 'description'],
        numbers: ['number', 'startTime', 'endTime'],
        optionals: ['_id']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------
    
    public _id?: ObjectId
    public name!: string 
    public description!: string 
    public number!: number
    public startTime!: number
    public endTime!: number

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: PageDataType){
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public compareById(otherId: ObjectId): boolean{
        return ObjectUtils.compareObjectIds(this._id!, otherId)
    }

    public validate(): void{
        Validator.validateInstanceOfClass(this, Page, false)
    }

    getId(): ObjectId{
        return this._id!
    }

}