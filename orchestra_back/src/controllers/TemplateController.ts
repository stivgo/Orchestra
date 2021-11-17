import { Element } from "../models/elements/abstractElements/Element";
import { ProjectDataType } from "../models/projects/Project";
import { Template, TemplateDataType } from "../models/projects/Template";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ElementController } from "./ElementController";
import { PageController } from "./PageController";
import { ProjectController } from "./ProjectController";
import { SectionController } from "./SectionController";

export class TemplateController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    static async createTemplateFromProject(requesterUserId: IdType, data: any){
        ObjectUtils.throwExceptionIfNotExist(data.projectId, 'The field [projectId] does not exist in the request')
        const projectId = data.projectId
        const project = await ProjectController.exportProject(requesterUserId, projectId)
        const templateData = this.getDataFromCreateRequest(data)
        templateData.baseProject = project
        const newTemplate = new Template(templateData)
        newTemplate.validate()
        await DatabaseManager.createDocument( Template.COLLECTION, newTemplate )
        return newTemplate
    }

    static async createProjectFromTemplate(requesterUserId: IdType, templateId: IdType, newProjectData: any){
        const projectExtraData = this.getDataFromCreateProjectFromTemplateRequest(newProjectData)
        const template = await this.findTemplateById(templateId)
        const baseProject = template.baseProject
        baseProject.organizationId = projectExtraData.organizationId
        baseProject.name = projectExtraData.name
        baseProject.description = projectExtraData.description
        const project = await ProjectController.createEmptyProject(requesterUserId, baseProject)
        let projectId = project._id
        for(let i=0; i<baseProject.sections.length; i++){
            const currSection = baseProject.sections[i]
            const sectionId = (await SectionController.createEmptySection(requesterUserId, projectId, currSection))._id!
            for(let j=0; j<currSection.pages.length; j++){
                const currPage = currSection.pages[j]
                const pageId = (await PageController.createEmptyPage(requesterUserId, project._id, sectionId, currPage, false))._id!
                //@ts-ignore
                let elements: Element[] = currPage.elements
                for(let k=0; k<elements.length; k++){
                    await this.createElementsRecursively(requesterUserId, projectId, pageId, elements[k])
                }
            }
        }
        return project
    }

    static async findAllTemplates(): Promise<Template[]>{
        return await DatabaseManager.findAllDocuments(Template.COLLECTION, Template)
    }

    static async findTemplateById(templateId: IdType): Promise<Template>{
        const template = await DatabaseManager.findDocumentById(Template.COLLECTION, templateId, Template)
        ObjectUtils.throwExceptionIfNotExist( template, 'The Template [' + templateId + '] was not found' )
        return template
    }

    static async deleteTemplate(requesterUserId: IdType, templateId: IdType): Promise<void>{
        const template = await this.findTemplateById(templateId)
        if ( !ObjectUtils.compareIds(requesterUserId, template.creator) ){
            throw Error('The User [' + requesterUserId + '] is not the owner of the Template [' + templateId + ']')
        }
        await DatabaseManager.deleteDocument(Template.COLLECTION, templateId)
    }
        
    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static getDataFromCreateRequest(data: any): TemplateDataType{
        return {
            _id: DatabaseManager.generateObjectId(),
            name: data.name,
            creationDate: new Date(),
            creator: data.creator,
            description: data.description,
            baseProject: {} as ProjectDataType
        }
    }

    private static getDataFromCreateProjectFromTemplateRequest(data: any): any{
        return {
            organizationId: ObjectUtils.getIdAsObjectId(data.organizationId),
            name: data.name,
            description: data.description
        }
    }

    private static async createElementsRecursively(requesterUserId: IdType, projectId: IdType, pageId: IdType, element: any){
        try{
            const childElements: Element[] = (element.childElements) ? element.childElements : []
            delete element.childElements
            element.pageId = ObjectUtils.getIdAsObjectId(pageId)
            if ( element.childElementIds ){
                element.childElementIds = []
            }
            const newElement = await ElementController.createElement(requesterUserId, projectId, element)
            for(let i=0; i<childElements.length; i++){
                childElements[i].parentId = ObjectUtils.getIdAsObjectId(newElement._id!)
                await this.createElementsRecursively(requesterUserId, projectId, pageId, childElements[i])
            }
        }
        catch(error){
            console.log( "An unexpected Error has ocurred, it has affected the Template creation, so the template will be created with problems", error );
        }
    }
}