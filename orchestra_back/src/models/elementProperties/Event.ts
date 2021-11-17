import { Validator } from "../../utils/Validator"

export type EventDataType = {
    callback: string
    trigger: string
    type: string
}

export class Event{
 
    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES = { strings: ['callback', 'trigger', 'type'] }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public callback!: string
    public trigger!: string
    public type!: string

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: EventDataType) {
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Event, false)
    }

}