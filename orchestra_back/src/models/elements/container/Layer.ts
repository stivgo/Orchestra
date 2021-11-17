import { Container, ContainerDataType } from "./Container";
import { Element } from "../abstractElements/Element";
import { Validator } from "../../../utils/Validator";

export type LayerDataType = ContainerDataType & {

}

export class Layer extends Container{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Layer"
    static #init = Element.ELEMENT_TYPES_REGISTER[Layer.DATA_TYPE] = Layer
    public static REQUIRED_ATTRIBUTES = Container.REQUIRED_ATTRIBUTES

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: LayerDataType) {
        super(data)
        this.type = Layer.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Layer, false)
    }

}