import { ObjectId } from "mongoose";
import ObjectUtils from "../../../utils/ObjectUtils";
import { Validator } from "../../../utils/Validator";
import { Element, ElementDataType } from "../abstractElements/Element";

export type ContainerDataType = ElementDataType & {
    childElementIds: ObjectId[]
}

export class Container extends Element {
    
    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static DATA_TYPE = "Container"
    static #init = Element.ELEMENT_TYPES_REGISTER[Container.DATA_TYPE] = Container
    
    public static REQUIRED_ATTRIBUTES = Validator.mergeRequiredAttributes(Element.REQUIRED_ATTRIBUTES, {
        idArrays: ['childElementIds'],
    })

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public childElementIds!: ObjectId[]

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: ContainerDataType){
        super(data)
        this.type = Container.DATA_TYPE
        if ( data.childElementIds === undefined ){
            this.childElementIds = []
        }
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Container, false)
    }

    //-----------------------------------------------------------------------
    // Children access methods
    //-----------------------------------------------------------------------

    public addChild(newChild: ObjectId){
        if ( this.searchIndexChild(newChild) >= 0 ){
            throw Error('The child Element [' + newChild + '] is already in the children list of the ' +
                'Element [' + this._id + ']')
        }
        this.childElementIds.push( newChild )
    }

    public findChild(searchedChild: ObjectId): ObjectId{
        const child = this.childElementIds[ this.searchIndexChild(searchedChild) ]
        ObjectUtils.throwExceptionIfNotExist(child, 'The child Element [' + searchedChild + '] was not' +
            ' found in the children list of the Element [' + this._id + ']')
        return child!
    }

    public deleteChild(deletedChild: ObjectId): void{
        const index = this.searchIndexChild(deletedChild)
        if ( index < 0 ){
            throw Error('The child Element [' + deletedChild + '] was not found in the children list'
                + ' of the Element [' + this._id + ']')
        }
        this.childElementIds.splice(index, 1)
    }

    private searchIndexChild(searchedChild: ObjectId): number{
        return this.childElementIds.findIndex( it => ObjectUtils.compareObjectIds( it, searchedChild ) )
    }

}