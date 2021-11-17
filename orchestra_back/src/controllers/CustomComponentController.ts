import { Element } from "../models/elements/abstractElements/Element";
import { CustomComponent } from "../models/elements/custom/CustomComponent";
import { CustomComponentTemplate } from "../models/elements/custom/CustomComponentTemplate";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { CustomComponentTemplateController } from "./CustomComponentTemplateController";

export class CustomComponentController{
    
    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public static async findByCustomComponentTemplate(templateId: IdType): Promise<CustomComponent[]>{
        const query = {type: CustomComponent.DATA_TYPE,templateId: ObjectUtils.getIdAsObjectId(templateId)}
        return await DatabaseManager.findDocumentsByQuery(Element.COLLECTION, query, CustomComponent)
    }

    public static async validateCustomComponentOnCreate(requesterUserId: IdType, customComponent: CustomComponent){
        const template = await CustomComponentTemplateController.findCustomComponentTemplateById(requesterUserId, customComponent.templateId)
        if(customComponent.childComponents.length === 0 && template.childComponents.length > 0){
            customComponent.childComponents = template.childComponents
        }
        else{
            customComponent.validateWithTemplate(template)
        }
    }

    public static async validateChildComponentsOnUpdate(requesterUserId: IdType, customComponent: CustomComponent){
        const template = await CustomComponentTemplateController.findCustomComponentTemplateById(requesterUserId, customComponent.templateId)
        customComponent.validateWithTemplate(template)
    }

    public static async updateComponentsOnTemplateChange(newTemplate: CustomComponentTemplate){
        const customComponents: CustomComponent[] = await this.findByCustomComponentTemplate(newTemplate._id!)
        customComponents.forEach( async (e)=> this.adaptToNewTemplate(newTemplate, e) )
        customComponents.forEach( async (e)=> await DatabaseManager.updateDocumentById(Element.COLLECTION, e._id!, e) )
    }

    public static async deleteInstancesOnTemplateDelete(templateId: IdType){
        const queryDelete = {templateId: ObjectUtils.getIdAsObjectId(templateId)}
        await DatabaseManager.deleteDocumentsByQuery(Element.COLLECTION, queryDelete)
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static adaptToNewTemplate(newTemplate: CustomComponentTemplate, customComponent: CustomComponent): void{
        let newTemplateChildren = newTemplate.childComponents.slice()
        for(let i=0; i<customComponent.childComponents.length; i++){
            let instanceIt = customComponent.childComponents[i]
            let matched = false
            for(let j=0; j<newTemplateChildren.length; j++){
                let newChild = newTemplateChildren[j]
                if ( newChild.type === instanceIt.type ){
                    instanceIt.xPosition = newChild.xPosition
                    instanceIt.yPosition = newChild.yPosition
                    instanceIt.zPosition = newChild.zPosition
                    instanceIt.width = newChild.width
                    instanceIt.height = newChild.height
                    matched = true
                    newTemplateChildren.splice(j, 1)
                    break
                }
            }
            if ( !matched ){
                customComponent.childComponents.splice(i, 1)
                i--
            }
        }
        for(let i=0; i<newTemplateChildren.length; i++){
            customComponent.childComponents.push( newTemplateChildren[i] )
        }
        customComponent = new CustomComponent(customComponent)
    }

}