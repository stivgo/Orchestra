import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type AudioDataType = ComponentDataType & {
    audioType: string
}

export class Audio extends Component {

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Audio"
    static #init = Element.ELEMENT_TYPES_REGISTER[Audio.DATA_TYPE] = Audio
    
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Component.REQUIRED_ATTRIBUTES, {
        strings:['audioType']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public audioType!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------
    
    constructor(data: AudioDataType){
        super(data)
        this.type = Audio.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Audio, false)
    }

}