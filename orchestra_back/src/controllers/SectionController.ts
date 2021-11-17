import { Project } from "../models/projects/Project";
import { Section, SectionDataType } from "../models/projects/Section";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ElementController } from "./ElementController";
import { ProjectController } from "./ProjectController";

export class SectionController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    static async createEmptySection(requesterUserId: IdType, projectId: IdType, data: any){
        const defaultData = this.getDataFromCreateRequest(data)
        const newSection = new Section(defaultData)
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        project.addSection(newSection)
        await ProjectController.updateProject( requesterUserId, project, false )
        return newSection
    }

    static async findSectionById(requesterUserId: IdType, projectId: IdType, sectionId: IdType): Promise<Section>{
        const project: Project = await ProjectController.findProjectById(requesterUserId, projectId)
        return project.findSection( ObjectUtils.getIdAsObjectId(sectionId) )
    }

    static async updateSectionFromExternalRequest(requesterUserId: IdType, projectId: string, data: SectionDataType): Promise<Section>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        const originalSection = await this.findSectionById( requesterUserId, projectId, data._id! )
        const modifiedSectionData = this.getDataFromUpdateRequest( data, originalSection )
        const updatedSection = new Section( modifiedSectionData )
        return await this.updateSection( requesterUserId, projectId, updatedSection )
    }

    static async updateSection(requesterUserId: IdType, projectId: IdType, updatedSection: Section): Promise<Section>{
        updatedSection.validate()
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        project.updateSection(updatedSection)
        await ProjectController.updateProject(requesterUserId, project, false)
        return updatedSection
    }

    static async deleteSection(requesterUserId: IdType, projectId: IdType, sectionId: IdType): Promise<void>{
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        const section = project.findSection(ObjectUtils.getIdAsObjectId(sectionId))
        project.deleteSection( ObjectUtils.getIdAsObjectId(sectionId) )
        await ProjectController.updateProject(requesterUserId, project, false)
        for(let i=0; i<section.pages.length; i++){
            ElementController.deleteElementsByPageId( section.pages[i]._id! )
        }
    }
        
    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static getDataFromCreateRequest(data: any): SectionDataType{
        return {
            _id: DatabaseManager.generateObjectId(),
            name: data.name,
            number: data.number,
            startTime: data.startTime,
            endTime: data.endTime,
            pages: []
        }
    }

    private static getDataFromUpdateRequest(newData: any, originalSection: Section): SectionDataType{
        const originalSectionData = originalSection as unknown as SectionDataType
        return {
            ...originalSectionData,
            name: newData.name,
            number: newData.number,
            startTime: newData.startTime,
            endTime: newData.endTime
        }
    }

}