import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { Validator } from "../../utils/Validator"

export type CssStyleDataType = {
    property: string
    value: string
}

export class CssStyle {

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['property', 'value']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public property!: string 
    public value!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: CssStyleDataType){
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(){
        Validator.validateInstanceOfClass(this, CssStyle, false)
    }

    public toString(){
        return this.property + ":" + this.value + ";"
    }
}