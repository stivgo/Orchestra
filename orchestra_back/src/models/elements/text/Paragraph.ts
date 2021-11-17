import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type ParagraphDataType = ComponentDataType & {
    content: string
}

export class Paragraph extends Component{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Paragraph"
    static #init = Element.ELEMENT_TYPES_REGISTER[Paragraph.DATA_TYPE] = Paragraph

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

    constructor(data: ParagraphDataType){
        super(data)
        this.type = Paragraph.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Paragraph, false)
    }

}