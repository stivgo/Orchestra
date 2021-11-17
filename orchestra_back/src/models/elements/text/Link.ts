import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type LinkDataType = ComponentDataType & {
    content: string
}

export class Link extends Component{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Link"
    static #init = Element.ELEMENT_TYPES_REGISTER[Link.DATA_TYPE] = Link

    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes( Component.REQUIRED_ATTRIBUTES, {
        strings: ['content']
    } )

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public content!: string 

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: LinkDataType){
        super(data)
        this.type = Link.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Link, false)
    }

}