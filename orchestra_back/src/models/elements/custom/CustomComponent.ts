import { ObjectId } from "mongoose";
import ObjectUtils from "../../../utils/ObjectUtils";
import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element, ElementDataType } from "../abstractElements/Element";
import { CustomComponentTemplate } from "./CustomComponentTemplate";

export type CustomComponentDataType = ElementDataType & {
    templateId: ObjectId
    childComponents: ComponentDataType[]
}

export class CustomComponent extends Element{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "CustomComponent"
    static #init = Element.ELEMENT_TYPES_REGISTER[CustomComponent.DATA_TYPE] = CustomComponent
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Element.REQUIRED_ATTRIBUTES, {
        ids: ['templateId'],
        customArrays: ['childComponents']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public templateId!: ObjectId
    public childComponents!: Component[]

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: CustomComponentDataType){
        super(data)
        this.type = CustomComponent.DATA_TYPE
        this.assignChildren()
        this.templateId = ObjectUtils.getIdAsObjectId(this.templateId)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    private assignChildren(){
        Validator.validateArrayType(this.childComponents, undefined,'childComponents')
        //@ts-ignore
        this.childComponents = Element.parseElementObjectArray(this.childComponents)
        for(let i in this.childComponents){
            if ( !(this.childComponents[i] instanceof Component) ){
                throw Error('The type [' + this.childComponents[i].type + '] is not allowed to be a child in a CustomComponent')
            }
            this.childComponents[i].pageId = this._id!
            this.childComponents[i].parentId = this._id!
            this.childComponents[i]._id = this._id!
        }
    }

    public validate(): void{
        Validator.validateInstanceOfClass(this, CustomComponent, false)
        for(let i in this.childComponents){
            if ( !(this.childComponents[i] instanceof Component) ){
                throw Error('The type [' + this.childComponents[i].type + '] is not allowed to be a child in a CustomComponent')
            }
        }
    }

    public validateWithTemplate(template :CustomComponentTemplate): void{
        let templateChildList = template.childComponents.map( e => e.type )
        for(let i=0; i<this.childComponents.length; i++){
            let found = false
            for(let j=0; j<templateChildList.length; j++){
                if ( this.childComponents[i].type === templateChildList[j] ){
                    found = true
                    templateChildList.splice(j, 1)
                    break
                }
            }
            if ( !found ){
                throw new Error( this.getErrorMessageByWrongChildElements(template) )
            }
        }
        if ( templateChildList.length > 0 ){
            throw new Error( this.getErrorMessageByWrongChildElements(template) )
        }

    } 

    private getErrorMessageByWrongChildElements(template: CustomComponentTemplate){
        const templateChildList = template.childComponents.map( e => e.type )
        const thisChildList = this.childComponents.map( e => e.type )
        return 'The childComponents [' + templateChildList + '] specified in the [' + template.name + '] template does not match with the childComponents [' + thisChildList + '] defined in the CustomComponent with id [' + this._id + ']'
    }

}