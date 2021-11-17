import { ObjectId } from "mongoose";
import { HtmlRender } from "../../../utils/HtmlRender";
import ObjectUtils from "../../../utils/ObjectUtils";
import { RequiredAttributes } from "../../../utils/RequiredAttributes";
import { CssStyle, CssStyleDataType } from "../../elementProperties/CssStyle";
import { Event, EventDataType } from "../../elementProperties/Event";


export type ElementDataType = {
    _id?: ObjectId
    pageId: ObjectId
    parentId?: ObjectId
    type: string
    title: string
    description: string
    xPosition: number
    yPosition: number
    zPosition: number
    width: number
    height: number
    startTime: number
    endTime: number
    isSelected: boolean
    isActive: boolean
    isVisible: boolean
    isStatic: boolean
    isLocked: boolean
    events: EventDataType[]
    styles: CssStyleDataType[]
    stylesString: string
}

export abstract class Element{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'elements'
    protected static ELEMENT_TYPES_REGISTER: any = {}

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['type', 'title', 'description', 'stylesString'],
        numbers: ['xPosition', 'yPosition', 'zPosition', 'width', 'height', 'startTime', 'endTime'],
        booleans: ['isSelected', 'isActive', 'isVisible', 'isLocked', 'isStatic'],
        customArrays: ['events', 'styles'],
        ids: ['pageId'],
        optionals: ['parentId', '_id']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id?: ObjectId
    public pageId!: ObjectId
    public parentId?: ObjectId
    public type!: string
    public title!: string 
    public description!: string
    public xPosition!: number
    public yPosition!: number
    public zPosition!: number
    public width!: number
    public height!: number
    public startTime!: number
    public endTime!: number 
    public isSelected!: boolean 
    public isActive!: boolean
    public isVisible!: boolean
    public isStatic!: boolean
    public isLocked!: boolean
    public events: Event[] = []
    public styles: CssStyle[] = []
    public stylesString: string

    //-----------------------------------------------------------------------
    // Contructor
    //-----------------------------------------------------------------------

    constructor(data: ElementDataType){
        Object.assign(this, data)
        this.events = ObjectUtils.parseClassObjectArray(this.events, Event)
        this.styles = ObjectUtils.parseClassObjectArray(this.styles, CssStyle)
        this.stylesString = this.getStylesString()
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public getStylesString(): string{
        let string = ""
        for(let i in this.styles){
            string += this.styles[i].toString()
        }
        return string
    }

    public getId(): ObjectId{
        return this._id!
    }

    public getPageId(): ObjectId{
        return this.pageId
    }

    public getParendId(): ObjectId | undefined{
        return this.parentId
    }

    public compareById(otherId: ObjectId): boolean{
        return ObjectUtils.compareObjectIds( this._id!, otherId )
    }

    public abstract validate(): void

    public renderHtml(): HtmlRender {
        return new HtmlRender()
    }

    public static parseElementObjectArray(data: ElementDataType[]): Element[]{
        return data.map( e => this.parseElementObject(e) )
    }

    public static parseElementObject(data: ElementDataType): Element{
        if ( data.type === undefined ) {
            throw Error("Undefined Element [type] field")
        }
        else if ( this.ELEMENT_TYPES_REGISTER[data.type+""] === undefined ){
            throw Error("Unknown Element data type: " + data.type )
        }
        //@ts-ignore
        return new this.ELEMENT_TYPES_REGISTER[data.type+""](data)
    }

}