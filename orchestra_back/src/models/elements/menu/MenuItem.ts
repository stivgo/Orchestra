import { RequiredAttributes } from "../../../utils/RequiredAttributes"
import { Validator } from "../../../utils/Validator"

export type MenuItemDataType = {
    text: string
    type: string
}

export class MenuItem {

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE: string = "MenuItem"
    public static MENU_ITEM_TYPES_REGISTER: any = {
        [MenuItem.DATA_TYPE]: MenuItem
    }
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = { strings: ['text', 'type'] }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public text!: string 
    public type!: string

    //-----------------------------------------------------------------------
    // Consturctor
    //-----------------------------------------------------------------------

    constructor(data: MenuItemDataType) {
        Object.assign(this, data)
        this.type = MenuItem.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, MenuItem, false)
    }

    static parseMenuItemObjectArray(data: MenuItemDataType[]): MenuItem[]{
        return data.map( e => {
            if ( this.MENU_ITEM_TYPES_REGISTER[e.type+""] === undefined ){
                throw Error("Unknown MenuItem data type: " + e.type )
            }
            //@ts-ignore
            return new this.MENU_ITEM_TYPES_REGISTER[e.type+""](e)
        })
    }

}