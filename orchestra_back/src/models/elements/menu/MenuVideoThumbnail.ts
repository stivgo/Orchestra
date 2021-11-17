import { Validator } from "../../../utils/Validator";
import { MenuItem } from "./MenuItem";
import { MenuThumbnail, MenuThumbnailDataType } from "./MenuThumbnail";

export type MenuVideoThumbnailDataType = MenuThumbnailDataType & {
    title: string
    description: string
    issueDate: Date
}

export class MenuVideoThumbnail extends MenuThumbnail{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "MenuVideoThumbnail"
    static #init = MenuItem.MENU_ITEM_TYPES_REGISTER[MenuVideoThumbnail.DATA_TYPE] = MenuVideoThumbnail
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(MenuThumbnail.REQUIRED_ATTRIBUTES, {
        strings: ['title', 'description'], dates: ['issueDate']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public title!: string
    public description!: string
    public issueDate!: Date

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: MenuVideoThumbnailDataType) {
        super(data)
        this.type = MenuVideoThumbnail.DATA_TYPE
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, MenuVideoThumbnail, false)
    }

}