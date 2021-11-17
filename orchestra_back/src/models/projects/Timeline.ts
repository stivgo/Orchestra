import { ObjectId } from "mongoose";
import ObjectUtils from "../../utils/ObjectUtils";
import { RequiredAttributes } from "../../utils/RequiredAttributes";
import { Validator } from "../../utils/Validator";
import { TimelineElement, TimelineElementDataType } from "./TimelineElement";

export type TimelineDataType = {
    _id: ObjectId
    elements: TimelineElementDataType[],
    projectId: ObjectId
}

export class Timeline{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'timelines'
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        ids: ['_id', 'projectId'],
        customArrays: ['elements']
    }
    
    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id!: ObjectId
    public elements: TimelineElement[] = []
    public projectId!: ObjectId
    
    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: TimelineDataType){
        Object.assign(this, data)
        this.elements = ObjectUtils.parseClassObjectArray(this.elements, TimelineElement)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Timeline, false)
    }

    //-----------------------------------------------------------------------
    // Children Methods
    //-----------------------------------------------------------------------

    public addTimelineElement(element: TimelineElement){
        element.validate()
        let oldTimelineElementIndex = this.elements.findIndex( it => it.compareById(element._id) )
        if ( oldTimelineElementIndex === -1 ){
            this.elements.push(element)
        }
        else{
            throw Error(`The Element [${element._id!}] already exists in the Timeline [${this._id}]`)
        }
        
    }

    public findTimelineElement(elementId: ObjectId): TimelineElement{
        let searchedTimelineElement = this.elements.find( it => it.compareById(elementId) )
        ObjectUtils.throwExceptionIfNotExist(searchedTimelineElement, 'The element [' + elementId + '] does not exist in the timeline [' + this._id + ']')
        return searchedTimelineElement!
    }

    public updateTimelineElement(newTimelineElement: TimelineElement, throwErrorIfNotExists: boolean): void{
        newTimelineElement.validate()
        let oldTimelineElementIndex = this.elements.findIndex( it => it.compareById(newTimelineElement._id) )
        if ( throwErrorIfNotExists ){
            ObjectUtils.throwExceptionIfNotExist( this.elements[oldTimelineElementIndex], 'The element [' + newTimelineElement._id + '] does not exist in the timeline [' + this._id + ']' )
        }
        else if (oldTimelineElementIndex === -1){
            return
        }
        
        this.elements[oldTimelineElementIndex] = newTimelineElement
    }

    public deleteTimelineElement(deletedId: ObjectId, throwErrorIfNotExists: boolean): void{
        let oldTimelineElementIndex = this.elements.findIndex( it => it.compareById(deletedId) )
        if ( throwErrorIfNotExists ){
            ObjectUtils.throwExceptionIfNotExist( this.elements[oldTimelineElementIndex], 'The element [' + deletedId + '] does not exist in the timeline [' + this._id + ']' )
        }
        else if (oldTimelineElementIndex === -1){
            return
        }
        this.elements.splice(oldTimelineElementIndex, 1)
    }

}