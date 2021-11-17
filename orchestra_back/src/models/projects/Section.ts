import { ObjectId } from "mongoose"
import ObjectUtils from "../../utils/ObjectUtils"
import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { Validator } from "../../utils/Validator"
import { Page, PageDataType } from "./Page"

export type SectionDataType = {
    _id?: ObjectId
    name: string
    number: number
    startTime: number
    endTime: number
    pages: PageDataType[]
}

export class Section{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['name'],
        numbers: ['startTime', 'endTime', 'number'],
        customArrays: ['pages'],
        optionals: ['_id']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id?: ObjectId
    public name!: string
    public number!: number
    public startTime!: number
    public endTime!: number
    public pages: Page[] = []

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: SectionDataType){
        Object.assign(this, data)
        this.pages = ObjectUtils.parseClassObjectArray(this.pages, Page)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public compareById(id: ObjectId): boolean{
        return ObjectUtils.compareObjectIds(this._id!, id)
    }

    public validate(){
        Validator.validateInstanceOfClass(this, Section, false)
    }

    public getId(): ObjectId{
        return this._id!
    }

    //-----------------------------------------------------------------------
    // Child properties access methods
    //-----------------------------------------------------------------------

    public addPage(page: Page){
        page.validate()
        this.pages.push(page)
    }

    public findPage(pageId: ObjectId): Page{
        let searchedPage = this.pages.find( it => it.compareById(pageId) )
        ObjectUtils.throwExceptionIfNotExist(searchedPage, 'The page [' + pageId + '] does not exist in the section [' + this._id + ']')
        return searchedPage!
    }

    public updatePage(newPage: Page): void{
        newPage.validate()
        let oldSectionIndex = this.pages.findIndex( it => it.compareById(newPage.getId()) )
        ObjectUtils.throwExceptionIfNotExist( this.pages[oldSectionIndex], 'The page [' + newPage.getId() + '] does not exist in the section [' + this._id + ']' )
        this.pages[oldSectionIndex] = newPage
    }

    public deletePage(deletedId: ObjectId): void{
        let oldSectionIndex = this.pages.findIndex( it => it.compareById(deletedId) )
        ObjectUtils.throwExceptionIfNotExist( this.pages[oldSectionIndex], 'The page [' + deletedId + '] does not exist in the section [' + this._id + ']' )
        this.pages.splice(oldSectionIndex, 1)
    }

}