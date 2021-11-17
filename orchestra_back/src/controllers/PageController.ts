import { Container, ContainerDataType } from "../models/elements/container/Container";
import { Layer, LayerDataType } from "../models/elements/container/Layer";
import { Page, PageDataType } from "../models/projects/Page";
import { Project } from "../models/projects/Project";
import { Section } from "../models/projects/Section";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ElementController } from "./ElementController";
import { ProjectController } from "./ProjectController";
import { SectionController } from "./SectionController";
import { TimelineController } from "./TimelineController";

export class PageController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    static async createEmptyPage(requesterUserId: IdType, projectId: IdType, sectionId: IdType, data: any, includeBasicElements: boolean): Promise<Page>{
        const defaultData = this.getDataFromCreateRequest(data)
        const newPage = new Page(defaultData)
        const section = await SectionController.findSectionById(requesterUserId, projectId, sectionId)
        section.addPage(newPage)
        await SectionController.updateSection( requesterUserId, projectId, section )
        await TimelineController.create(projectId, newPage._id!)
        if ( includeBasicElements ){
            const containerData = this.createDefaultContainer(newPage.getId()) 
            const container = await ElementController.createElement(requesterUserId, projectId, containerData )
            const layerData = this.createDefaultLayer(newPage.getId(), container.getId())
            await ElementController.createElement(requesterUserId, projectId, layerData )            
        }
        return newPage
    }

    static async findPageByIdAndSection(requesterUserId: IdType, projectId: IdType, sectionId: IdType, pageId: IdType): Promise<Page>{
        const section: Section = await SectionController.findSectionById(requesterUserId, projectId, sectionId)
        return section.findPage( ObjectUtils.getIdAsObjectId(pageId) )
    }

    static async findPageById(requesterUserId: IdType, projectId: IdType, pageId: IdType): Promise<Page>{
        const project: Project = await ProjectController.findProjectById(requesterUserId, projectId)
        const sections: Section[] = project.getSections()
        for(let i in sections){
            try{
                return sections[i].findPage( ObjectUtils.getIdAsObjectId(pageId) )
            }
            catch(error){}
        }
        throw Error('The Page [' + pageId + '] does not exist in any Section of the Project [' + projectId + ']')

    }

    static async updatePageFromExternalRequest(requesterUserId: IdType, projectId: IdType, sectionId: IdType, data: PageDataType): Promise<Page>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        const originalPage = await this.findPageByIdAndSection( requesterUserId, projectId, sectionId, data._id! )
        const modifiedPageData = this.getDataFromUpdateRequest( data, originalPage )
        const updatedPage = new Page( modifiedPageData )
        return await this.updatePage( requesterUserId, projectId, sectionId, updatedPage )
    }

    static async updatePage(requesterUserId: IdType, projectId: IdType, sectionId: IdType, updatedPage: Page): Promise<Page>{
        updatedPage.validate()
        const section = await SectionController.findSectionById(requesterUserId, projectId, sectionId)
        section.updatePage(updatedPage)
        await SectionController.updateSection(requesterUserId, projectId, section)
        await ProjectController.updateTimes(requesterUserId, projectId, updatedPage._id!, updatedPage.startTime, updatedPage.endTime)
        return updatedPage
    }

    static async deletePage(requesterUserId: IdType, projectId: IdType, sectionId: IdType, pageId: IdType): Promise<void>{
        const section = await SectionController.findSectionById(requesterUserId, projectId, sectionId)
        section.deletePage( ObjectUtils.getIdAsObjectId(pageId) )
        await SectionController.updateSection(requesterUserId, projectId, section)
        await ElementController.deleteElementsByPageId(pageId)
        await TimelineController.delete(pageId)
    }
        
    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static getDataFromCreateRequest(data: any): PageDataType{
        return {
            _id: DatabaseManager.generateObjectId(),
            name: data.name,
            description: data.description,
            number: data.number,
            startTime: data.startTime,
            endTime: data.endTime,
        }
    }

    private static getDataFromUpdateRequest(newData: any, originalPage: Page): PageDataType{
        const originalPageData = originalPage as unknown as PageDataType
        return {
            ...originalPageData,
            name: newData.name,
            description: newData.description,
            number: newData.number,
            startTime: newData.startTime,
            endTime: newData.endTime
        }
    }

    private static createDefaultContainer(pageId: IdType): ContainerDataType{
        return {
            description: "Default Container",
            endTime: 0,
            startTime: 0,
            events: [],
            height: 100,
            isActive: true,
            isSelected: false,
            isVisible: true,
            isLocked: false,
            pageId: pageId,
            styles: [],
            stylesString: "",
            title: "Default Container",
            width: 100,
            xPosition: 0,
            yPosition: 0,
            zPosition: 1,
            childElementIds: [],
            type: Container.DATA_TYPE,
            isStatic: true,
        } as ContainerDataType
    }

    private static createDefaultLayer(pageId: IdType, containerId: IdType): LayerDataType{
        return {
            parentId: containerId,
            description: "Default Layer",
            endTime: 0,
            startTime: 0,
            events: [],
            height: 100,
            isActive: true,
            isSelected: false,
            isVisible: true,
            isLocked: false,
            isStatic: true,
            pageId: pageId,
            styles: [],
            stylesString: "",
            title: "Default Layer",
            width: 100,
            xPosition: 0,
            yPosition: 0,
            zPosition: 1,
            childElementIds: [],
            type: Layer.DATA_TYPE,
        } as LayerDataType
    }

}