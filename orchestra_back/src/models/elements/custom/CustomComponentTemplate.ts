import { ObjectId } from "mongoose";
import { RequiredAttributes } from "../../../utils/RequiredAttributes";
import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type CustomComponentTemplateDataType = {
    _id: ObjectId
    projectId: ObjectId
    name: string
    description: string
    defaultWidth: number
    defaultHeight: number
    childComponents: ComponentDataType[]
}

export class CustomComponentTemplate {

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'customComponentTemplates'
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        customArrays: ['childComponents'],
        strings: ['name', 'description'],
        numbers: ['defaultWidth', 'defaultHeight'],
        ids: ['_id', 'projectId']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id!: ObjectId
    public projectId!: ObjectId
    public name!: string
    public description!: string
    public defaultWidth!: number
    public defaultHeight!: number
    public childComponents!: Component[]

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: CustomComponentTemplateDataType){
        Object.assign(this, data)
        this.assignChildren()
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(): void{
        Validator.validateInstanceOfClass(this, CustomComponentTemplate, false)
    }

    private assignChildren(){
        Validator.validateArrayType(this.childComponents, undefined,'childComponents')
        //@ts-ignore
        this.childComponents = Element.parseElementObjectArray(this.childComponents)
        for(let i in this.childComponents){
            if ( !(this.childComponents[i] instanceof Component) ){
                throw Error('The type [' + this.childComponents[i].type + '] is not allowed to be a child in a CustomComponent')
            }
            this.childComponents[i].pageId = this._id
            this.childComponents[i].parentId = this._id
            this.childComponents[i]._id = this._id
        }
    }

}