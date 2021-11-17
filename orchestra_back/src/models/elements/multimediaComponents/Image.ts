import { HtmlRender } from "../../../utils/HtmlRender";
import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type ImageDataType = ComponentDataType & {
    
    alternativeText: string

}

export class Image extends Component{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Image"
    static #init = Element.ELEMENT_TYPES_REGISTER[Image.DATA_TYPE] = Image
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Component.REQUIRED_ATTRIBUTES, {strings:['alternativeText']})
    
    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public alternativeText!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: ImageDataType){
        super(data)
        this.type = Image.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Image, false)
    }

    renderHtml(): HtmlRender{
        const htmlRender = super.renderHtml().setHtmlTag("img")
        htmlRender.addProperty("src", this.urlSource)
        htmlRender.addProperty("alt", this.alternativeText)
        return htmlRender
    }

}