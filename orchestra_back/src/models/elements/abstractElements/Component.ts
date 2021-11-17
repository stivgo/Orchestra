import { RequiredAttributes } from "../../../utils/RequiredAttributes";
import { Validator } from "../../../utils/Validator";
import { Element, ElementDataType } from "./Element";

export type ComponentDataType = ElementDataType & {
    urlSource: string
}

export abstract class Component extends Element{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = Validator.mergeRequiredAttributes(
        Element.REQUIRED_ATTRIBUTES, {strings: ['urlSource']}
    )

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public urlSource!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: ComponentDataType){
        super(data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

}