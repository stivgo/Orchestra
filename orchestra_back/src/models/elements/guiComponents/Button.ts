import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type ButtonDataType = ComponentDataType & {
    content: string
}

export class Button extends Component {

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Button"
    static #init = Element.ELEMENT_TYPES_REGISTER[Button.DATA_TYPE] = Button
    
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Component.REQUIRED_ATTRIBUTES, {
        strings: ['content']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public content!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: ButtonDataType){
        super(data)
        this.type = Button.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Button, false)
    }
}