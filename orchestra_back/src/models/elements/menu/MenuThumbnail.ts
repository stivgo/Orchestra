import { Validator } from "../../../utils/Validator";
import { Image, ImageDataType } from "../multimediaComponents/Image";
import { MenuItem, MenuItemDataType } from "./MenuItem";

export type MenuThumbnailDataType = MenuItemDataType & {
    iconUrl: string
    image: ImageDataType
}

export class MenuThumbnail extends MenuItem{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "MenuThumbnail"
    static #init = MenuItem.MENU_ITEM_TYPES_REGISTER[MenuThumbnail.DATA_TYPE] = MenuThumbnail
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(MenuItem.REQUIRED_ATTRIBUTES, {
        strings: ['iconUrl'], customTypes: ['image']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public iconUrl!: string 
    public image!: Image

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: MenuThumbnailDataType) {
        super(data)
        this.type = MenuThumbnail.DATA_TYPE
        this.image = new Image(data.image)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, MenuThumbnail, false)
    }

}