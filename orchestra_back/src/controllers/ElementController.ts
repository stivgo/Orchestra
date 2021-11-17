import { Element, ElementDataType } from "../models/elements/abstractElements/Element";
import { CustomComponent } from "../models/elements/custom/CustomComponent";
import { TimelineElementDataType } from "../models/projects/TimelineElement";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ContainerController } from "./ContainterController";
import { CustomComponentController } from "./CustomComponentController";
import { PageController } from "./PageController";
import { ProjectController } from "./ProjectController";
import { TimelineController } from "./TimelineController";

export class ElementController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    public static async createElement(requesterUserId: IdType, projectId: IdType, data: any): Promise<Element>{
        const pageId: IdType = data.pageId
        await this.checkIfUserIsAuthorizedToModifyElementInProject(requesterUserId, projectId)
        await this.checkIfPageExists(requesterUserId, projectId, pageId)
        const defaultData = this.getDataFromCreateRequest(data)
        const newElement = Element.parseElementObject( defaultData )
        newElement.validate()
        if ( newElement instanceof CustomComponent ){
            await CustomComponentController.validateCustomComponentOnCreate(requesterUserId, newElement)
        }
        if ( defaultData.parentId ){
            await ContainerController.addChildToParentElement(requesterUserId, projectId, defaultData.parentId, defaultData.pageId, newElement.getId())            
        }
        await ProjectController.updateLastModificationDate(projectId)
        const newElementData = await DatabaseManager.createDocument(Element.COLLECTION, newElement)
        return Element.parseElementObject(newElementData)
    }

    public static async findElementById(requesterUserId: IdType, projectId: IdType, elementId: IdType): Promise<Element>{
        await this.checkIfUserIsAuthorizedToWatchElementInProject(requesterUserId, projectId)
        const elementData: ElementDataType = await DatabaseManager.findDocumentById(Element.COLLECTION, elementId)
        ObjectUtils.throwExceptionIfNotExist(elementData, "The Element with id [" + elementId + "] was not found")
        return Element.parseElementObject(elementData)
    }

    public static async findElementsByPageId(requesterUserId: IdType, projectId: IdType, pageId: IdType): Promise<Element[]>{
        this.checkIfUserIsAuthorizedToWatchElementInProject(requesterUserId, projectId)
        const query = {pageId: ObjectUtils.getIdAsObjectId(pageId)}
        let elements: Element[] = await DatabaseManager.findDocumentsByQuery(Element.COLLECTION, query)
        if ( elements.length === 0 ){
            await PageController.findPageById(requesterUserId, projectId, pageId)
        }
        elements.forEach( (itElem:any)=>{
            delete itElem.childElementIds
        } )
        return ContainerController.joinChildrenElementsIntoParents(elements)
    }

    public static async updateElementFromExternalRequest(requesterUserId: IdType, projectId: IdType, data: ElementDataType): Promise<Element>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        const originalElement = await this.findElementById( requesterUserId, projectId, data._id! )
        const updatedData = this.getDataFromUpdateRequest(data, originalElement)        
        const updatedElement: Element = Element.parseElementObject( updatedData )
        updatedElement.validate()
        return this.updateElement(requesterUserId, projectId, updatedElement, originalElement)
    }

    public static async updateElement(requesterUserId: IdType, projectId: IdType, updatedElement: Element, originalElement?: ElementDataType): Promise<Element>{
        this.checkIfUserIsAuthorizedToModifyElementInProject(requesterUserId, projectId)
        updatedElement.validate()
        await DatabaseManager.updateDocumentById(Element.COLLECTION, updatedElement.getId(), updatedElement)
        await ProjectController.updateLastModificationDate(projectId)
        if ( originalElement === undefined ){
            originalElement = await DatabaseManager.findDocumentById(Element.COLLECTION, updatedElement._id!)
        }
        if ( updatedElement instanceof CustomComponent ){
            await CustomComponentController.validateChildComponentsOnUpdate(requesterUserId, updatedElement)
        }
        await ContainerController.updateChildElementsIfPresent(updatedElement, originalElement!)
        await TimelineController.updateElement(requesterUserId, updatedElement.pageId, updatedElement as unknown as TimelineElementDataType, false)
        if ( updatedElement.startTime !== originalElement?.startTime || updatedElement.endTime !== originalElement.endTime ){
            await ProjectController.updateTimes(requesterUserId, projectId, updatedElement.pageId, updatedElement.startTime, updatedElement.endTime)
        }
        return updatedElement
    }

    public static async deleteElement(requesterUserId: IdType, projectId: IdType, elementId: IdType): Promise<void>{
        const element:any = await DatabaseManager.findDocumentById(Element.COLLECTION, elementId)
        await TimelineController.deleteElement(element.pageId!, elementId, false)
        await this.checkIfUserIsAuthorizedToModifyElementInProject(requesterUserId, projectId)
        await DatabaseManager.deleteDocument(Element.COLLECTION, elementId)
        await ContainerController.deleteChildrenElementsIfPresent(requesterUserId, projectId, elementId)
        await ProjectController.updateLastModificationDate(projectId)
    }

    public static async deleteElementsByPageId(pageId: IdType): Promise<void>{
        const query = {pageId: ObjectUtils.getIdAsObjectId(pageId)}
        await DatabaseManager.deleteDocumentsByQuery(Element.COLLECTION, query)
    }

    //-----------------------------------------------------------------------
    // Authorization methods
    //-----------------------------------------------------------------------

    private static async checkIfPageExists(requesterUserId: IdType, projectId: IdType, pageId: IdType): Promise<void>{
        await PageController.findPageById(requesterUserId, projectId, pageId)
    }

    private static async checkIfUserIsAuthorizedToModifyElementInProject(requesterUserId: IdType, projectId: IdType): Promise<void>{
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        ProjectController.checkIfUserHasPermissionToModifyContent(project, requesterUserId)
    }

    private static async checkIfUserIsAuthorizedToWatchElementInProject(requesterUserId: IdType, projectId: IdType): Promise<void>{
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        ProjectController.checkIfUserHasPermissionInProject(project, requesterUserId)
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static getDataFromCreateRequest(data: any): ElementDataType{
        //TODO Check wich fields have to be initialized in this point
        let requestData = {
            ...data,
            pageId: ObjectUtils.getIdAsObjectId( data.pageId ),
            _id: DatabaseManager.generateObjectId()
        }
        if ( data.parentId ){
            requestData.parentId = ObjectUtils.getIdAsObjectId( data.parentId )
        }
        return requestData
    }

    private static getDataFromUpdateRequest(newData: any, originalElement: any): ElementDataType{
        const originalElementData = originalElement as unknown as ElementDataType
        let requestData = {
            ...originalElement,
            ...newData,
            pageId: ObjectUtils.getIdAsObjectId(originalElementData.pageId),
            _id: ObjectUtils.getIdAsObjectId(originalElement._id)
        }
        if ( originalElement.childElementIds ){
            requestData.childElementIds = originalElement.childElementIds
        }
        if ( originalElement.parentId ){
            requestData.parentId = ObjectUtils.getIdAsObjectId( originalElement.parentId )
        }
        return requestData
    }

}