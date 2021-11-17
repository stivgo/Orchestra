import { Section, SectionDataType } from "./Section"
import {Collaborator, CollaboratorDataType} from "./Collaborator"
import ObjectUtils from "../../utils/ObjectUtils"
import { Validator } from "../../utils/Validator"
import { HtmlRender } from "../../utils/HtmlRender"
import { RequiredAttributes } from "../../utils/RequiredAttributes"
import { ObjectId } from "mongoose"

export type ProjectDataType = {
    _id?: ObjectId
    organizationId: ObjectId
    name: string
    version: number
    creationDate: Date
    lastModificationDate: Date
    description: string
    collaborators: CollaboratorDataType[]
    sections: SectionDataType[]
}

export class Project{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'projects'
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['name', 'description'],
        ids: ['organizationId'],
        numbers: ['version'],
        dates: ['creationDate', 'lastModificationDate'],
        customArrays: ['collaborators', 'sections'],
        optionals: ['_id']
    }

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id!: ObjectId
    public organizationId!: ObjectId
    public name!: string
    public version!: number
    public creationDate!: Date
    public lastModificationDate!: Date
    public description!: string
    public collaborators: Collaborator[] = []
    public sections: Section[] = []
    
    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: ProjectDataType){
        Object.assign(this, data)
        this.collaborators = ObjectUtils.parseClassObjectArray(this.collaborators, Collaborator)
        this.sections = ObjectUtils.parseClassObjectArray(this.sections, Section)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public validate(): void {
        Validator.validateInstanceOfClass(this, Project, false)
    }

    public buildProject(): string {
        return this.renderHtml().render()
    }

    public getId(): ObjectId {
        return this._id
    }

    public getOrganizationId(): ObjectId {
        return this.organizationId
    }

    public getCollaborators(): Collaborator[] {
        return this.collaborators
    }

    //-----------------------------------------------------------------------
    // Child properties access methods
    //-----------------------------------------------------------------------

    public addSection(section: Section): void{
        section.validate()
        this.sections.push(section)
    }

    public findSection(sectionId: ObjectId): Section{
        let searchedSection = this.sections.find( it => it.compareById(sectionId) )
        ObjectUtils.throwExceptionIfNotExist(searchedSection, 'The section [' + sectionId + '] does not exist in the project [' + this._id + ']')
        return searchedSection!
    }

    public updateSection(newSection: Section): void{
        newSection.validate()
        let oldSectionIndex = this.sections.findIndex( it => it.compareById(newSection.getId()) )
        ObjectUtils.throwExceptionIfNotExist( this.sections[oldSectionIndex], 'The section [' + newSection.getId() + '] does not exist in the project [' + this._id + ']' )
        this.sections[oldSectionIndex] = newSection
    }

    public deleteSection(deletedId: ObjectId): void{
        let oldSectionIndex = this.sections.findIndex( it => it.compareById(deletedId) )
        ObjectUtils.throwExceptionIfNotExist( this.sections[oldSectionIndex], 'The section [' + deletedId + '] does not exist in the project [' + this._id + ']' )
        this.sections.splice(oldSectionIndex, 1)
    }

    public getSections(): Section[]{
        return this.sections
    }

    public setLastModificationDate(lastModificationDate: Date){
        this.lastModificationDate = lastModificationDate
    }

    //-----------------------------------------------------------------------
    // Collaborator methods
    //-----------------------------------------------------------------------

    public addCollaborator(newCollaborator: Collaborator): void{
        if ( this.collaborators.find( (collaborator) => collaborator.compareByUserId( newCollaborator.getUserId() ) ) ){
            throw Error('The User [' + newCollaborator.getUserId() + '] is already a Collborator in the Project [' + this._id + ']')
        }
        newCollaborator.validate()
        this.collaborators.push(newCollaborator)
    }

    public findUserCollaborator(userId: ObjectId): Collaborator{
        let searchedUser = this.collaborators.find( (collaborator) => collaborator.compareByUserId(userId) )
        ObjectUtils.throwExceptionIfNotExist(searchedUser, 'The user [' + userId + '] is not collaborator in the project [' + this._id + ']')
        return searchedUser!
    }

    public updateCollaborator(updatedCollaborator: Collaborator): void{
        updatedCollaborator.validate()
        let oldCollaboratorIndex = this.collaborators.findIndex( it => it.compareByUserId( updatedCollaborator.getUserId() ) )
        ObjectUtils.throwExceptionIfNotExist( this.collaborators[oldCollaboratorIndex], 'The user [' + updatedCollaborator.getUserId() + '] does not exist in the project [' + this._id + ']' )
        this.collaborators[oldCollaboratorIndex] = updatedCollaborator
    }

    public deleteCollaborator(user: ObjectId){
        let oldCollaboratorIndex = this.collaborators.findIndex( it => it.compareByUserId( user ) )
        ObjectUtils.throwExceptionIfNotExist( this.collaborators[oldCollaboratorIndex], 'The user [' + user + '] does not exist in the project [' + this._id + ']' )
        this.collaborators.splice(oldCollaboratorIndex, 1)
    }

    public userHasPermission(user: ObjectId, permission?: string): boolean{
        const collaborator = this.findUserCollaborator(user)
        return ( !permission ) ? true : collaborator.hasPermission(permission)
    }


    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private renderHtml(): HtmlRender{
        let html = new HtmlRender("html")
        let head = this.getHeadTags()
        let body = this.getBodyTags()
        return html.addChildren(head, body)
    }

    private getHeadTags(): HtmlRender{
        let meta = []
        meta[0] = new HtmlRender("meta").addProperty("http-equiv", "Expires" ).addProperty("content", "0")
        meta[1] = new HtmlRender("meta").addProperty("http-equiv", "Last-Modified" ).addProperty("content", "0")
        meta[2] = new HtmlRender("meta").addProperty("http-equiv", "Cache-Control" ).addProperty("content", "no-cache, mustrevalidate")
        meta[3] = new HtmlRender("meta").addProperty("http-equiv", "Pragma" ).addProperty("content", "no-cache")
        meta[4] = new HtmlRender("meta").addProperty("http-equiv", "Content-Type" ).addProperty("content", "text/html; charset=UTF-8")
        meta.forEach( it => it.setAutoClosed(true) )
        let title = new HtmlRender("title").addChild(this.name)
        let script = new HtmlRender("script").addProperty("type", "text/javascript").addProperty("src", "js/hbbtvlib.js")
        return new HtmlRender("head").addChildren(meta, title, script)
    }

    private getBodyTags(): HtmlRender{
        return new HtmlRender("body")
    }

}