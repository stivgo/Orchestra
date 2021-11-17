import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";

export type VideoDataType = ComponentDataType & {
    duration: number
} 

export class Video extends Component{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Video"
    static #init = Element.ELEMENT_TYPES_REGISTER[Video.DATA_TYPE] = Video
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Component.REQUIRED_ATTRIBUTES,
        {numbers: ['duration']})

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------
    
    public duration!: number

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: VideoDataType){
        super(data)
        this.type = Video.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Video, false)
    }

}