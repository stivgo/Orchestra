import { Validator } from "../../../utils/Validator";
import { Component, ComponentDataType } from "../abstractElements/Component";
import { Element } from "../abstractElements/Element";
import { MenuItem, MenuItemDataType } from "./MenuItem";
import { MenuThumbnail } from "./MenuThumbnail";

export type MenuDataType = ComponentDataType & {
    isNavigable: boolean
    isCyclical: boolean
    menuItems: MenuItemDataType[]
}

export class Menu extends Component{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Menu"
    static #init = Element.ELEMENT_TYPES_REGISTER[Menu.DATA_TYPE] = Menu
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Component.REQUIRED_ATTRIBUTES,{
        booleans: ['isNavigable', 'isCyclical'], customArrays: ['menuItems']
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public isNavigable!: boolean
    public isCyclical!: boolean
    public menuItems!: MenuItem[]

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: MenuDataType){
        super(data)
        this.type = Menu.DATA_TYPE
        this.assignMenuItems()
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(): void{
        Validator.validateInstanceOfClass(this, Menu, false)
    }

    public assignMenuItems(){
        Validator.validateArrayType(this.menuItems, undefined,'menuItems')
        //@ts-ignore
        this.menuItems = MenuItem.parseMenuItemObjectArray(this.menuItems)
        for(let i in this.menuItems){
            if ( this.menuItems[i] instanceof MenuThumbnail ){
                let currMenuItem = this.menuItems[i] as MenuThumbnail
                currMenuItem.image._id = this._id!
                currMenuItem.image.pageId = this._id!
                currMenuItem.image.parentId = this._id!
            }
        }
    }

}