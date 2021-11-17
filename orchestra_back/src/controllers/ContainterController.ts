import { ObjectId } from "mongoose";
import { Element, ElementDataType } from "../models/elements/abstractElements/Element";
import { Container, ContainerDataType } from "../models/elements/container/Container";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ElementController } from "./ElementController";

export class ContainerController{

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public static joinChildrenElementsIntoParents(elements: any[]): any[]{
        const addChild = (parentIndx: number, childIndx: number) =>{
            if ( !elements[parentIndx].childElements ){
                elements[parentIndx].childElements = []
            }
            elements[parentIndx].childElements.push( elements[childIndx] )
            elements.splice(childIndx, 1)
        }
        const hasChildren = (elem: any) =>{
            return elements.some( it => it.parentId && ObjectUtils.compareObjectIds( it.parentId, elem._id ) )
        }
        const emptyChildrenElements = elements.filter( (itElem) => {
            if ( itElem.parentId && !hasChildren(itElem) ){
                return itElem
            }
        } )
        let nextIteration = false
        emptyChildrenElements.forEach( (itElem) => {
            let indxPar = elements.findIndex( it => ObjectUtils.compareObjectIds(itElem.parentId, it._id) )
            let indxChl = elements.findIndex( it => ObjectUtils.compareObjectIds(itElem._id, it._id) )
            addChild(indxPar, indxChl)
            nextIteration = true
        } )
        if ( nextIteration ){
            return this.joinChildrenElementsIntoParents(elements) 
        }
        return elements
    }

    public static async addChildToParentElement(requesterUserId: IdType, projectId: IdType, parentId: IdType, pageId: IdType, childId: IdType) {
        let parentElement = await ElementController.findElementById(requesterUserId, projectId, parentId)
        if ( parentElement instanceof Container ){
            if ( !ObjectUtils.compareIds( parentElement.getPageId(), pageId ) ){
                throw Error('The page of the Parent [' + parentElement.getPageId() + '] is not the same that ' +
                    'the Child one [' + pageId + ']')
            }
            parentElement.addChild( ObjectUtils.getIdAsObjectId(childId) )
            await ElementController.updateElement(requesterUserId, projectId, parentElement)
        }
        else{
            throw Error('Is not possible to add a child Element to [' + parentId + ']')       
        }
    }
    
    public static async updateChildElementsIfPresent(updatedElement: Element, originalElementData: ElementDataType): Promise<void>{
        if ( updatedElement instanceof Container ){
            await this.updateChildrenIfStateHasChanged(updatedElement, originalElementData as ContainerDataType)
            //Other possible updates
        }
    }

    public static async deleteChildrenElementsIfPresent(requesterUserId: IdType, projectId: IdType, parentId: IdType){
        const query = {parentId: ObjectUtils.getIdAsObjectId(parentId)}
        const childrenElements = await DatabaseManager.findDocumentsByQuery(Element.COLLECTION, query)
        if ( childrenElements.length > 0 ){
            await DatabaseManager.deleteDocumentsByQuery(Element.COLLECTION, query)
            childrenElements.forEach( (e: any) => this.deleteChildrenElementsIfPresent(requesterUserId, projectId, e._id) )
        }
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static async updateChildrenIfStateHasChanged(updatedElement: Container, originalElementData: ContainerDataType): Promise<void>{
        let updateClause: any = {}
        if (updatedElement.isVisible !== originalElementData.isVisible){
            updateClause.isVisible = updatedElement.isVisible
        }
        if (updatedElement.isLocked !== originalElementData.isLocked){
            updateClause.isLocked = updatedElement.isLocked
        }
        if ( Object.keys(updateClause).length > 0 ){
            console.log('AQUÍ :V');
            this.updateRecursively(updatedElement._id!, updateClause)
        }
    }

    private static async updateRecursively(updatedParentId: ObjectId, updateClause: any){
        const updateQuery = {parentId: ObjectUtils.getIdAsObjectId(updatedParentId)}
        await DatabaseManager.updateDocumentsByQuery(Element.COLLECTION, updateQuery, updateClause)
        const findChildrenQuery = { parentId: ObjectUtils.getIdAsObjectId(updatedParentId), childElementIds: {$exists: true} }
        const containerChildren = await DatabaseManager.findDocumentsByQuery(Element.COLLECTION, findChildrenQuery)
        containerChildren.forEach( async(e: any) => await this.updateRecursively(e._id, updateClause) )
    }

}