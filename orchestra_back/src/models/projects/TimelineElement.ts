import { ObjectId } from "mongoose"
import ObjectUtils from "../../utils/ObjectUtils"
import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { Validator } from "../../utils/Validator"

export type TimelineElementDataType = {
    _id: ObjectId
    startTime: number
    endTime: number
    title: string
}

export class TimelineElement{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        ids: ['_id'],
        numbers: ['startTime', 'endTime'],
        strings: ['title']
    }
    
    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id!: ObjectId
    public startTime!: number
    public endTime!: number
    public title!: string
    
    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: TimelineElementDataType){
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, TimelineElement, false)
    }

    public compareById(otherId: ObjectId): boolean{
        return ObjectUtils.compareObjectIds(this._id!, otherId)
    }

}