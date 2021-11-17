import { CustomComponentTemplate, CustomComponentTemplateDataType } from "../models/elements/custom/CustomComponentTemplate";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { CustomComponentController } from "./CustomComponentController";
import { ProjectController } from "./ProjectController";

export class CustomComponentTemplateController{
    
    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    public static async createCustomComponentTemplate(requesterUserId: IdType, data: CustomComponentTemplateDataType){
        const newTemplateData = this.getDataFromCreateRequest(data)
        const projectId: IdType = newTemplateData.projectId
        await this.checkIfUserCanModifiyProject(projectId, requesterUserId)
        const newTemplate = new CustomComponentTemplate( newTemplateData )
        newTemplate.validate()
        await DatabaseManager.createDocument( CustomComponentTemplate.COLLECTION, newTemplate )
        return newTemplate
    }

    public static async findCustomComponentTemplateById(requesterUserId: IdType, customComponentTemplateId: IdType): Promise<CustomComponentTemplate>{
        const template = await DatabaseManager.findDocumentById( CustomComponentTemplate.COLLECTION, customComponentTemplateId, CustomComponentTemplate )
        ObjectUtils.throwExceptionIfNotExist(template, 'The CustomComponentTemplate with id [' + customComponentTemplateId + '] was not found')
        await this.checkIfUserCanWatchProject( template.projectId, requesterUserId )
        return template
    }

    public static async findCustomComponentTemplatesByProject(requesterUserId: IdType, projectId: IdType): Promise<CustomComponentTemplate[]>{
        await this.checkIfUserCanWatchProject( projectId, requesterUserId )
        const query = {projectId: ObjectUtils.getIdAsObjectId(projectId) }
        return await DatabaseManager.findDocumentsByQuery( CustomComponentTemplate.COLLECTION, query, CustomComponentTemplate)
    }

    public static async findByCustomComponentsInstancesByTemplate(requesterUserId: IdType, templateId: IdType){
        await this.findCustomComponentTemplateById(requesterUserId, templateId)
        return await CustomComponentController.findByCustomComponentTemplate(templateId)
    }

    public static async updateCustomComponentTemplateFromExternalRequest(requesterUserId: IdType, data: CustomComponentTemplateDataType): Promise<CustomComponentTemplate>{
        const originalData = await this.findCustomComponentTemplateById(requesterUserId, data._id!)
        const updateData = this.getDataFromUpdateRequest(data, originalData)
        const newTemplate = new CustomComponentTemplate( updateData )
        let response = await this.updateCustomComponentTemplate(requesterUserId, newTemplate)
        await CustomComponentController.updateComponentsOnTemplateChange(newTemplate)
        return response
    }

    public static async updateCustomComponentTemplate(requesterUserId: IdType, newTemplate: CustomComponentTemplate): Promise<CustomComponentTemplate>{
        this.checkIfUserCanModifiyProject( newTemplate.projectId, requesterUserId )
        newTemplate.validate()
        await DatabaseManager.updateDocumentById( CustomComponentTemplate.COLLECTION, newTemplate._id!, newTemplate )
        return newTemplate
    }

    public static async deleteCustomComponentTemplate(requesterUserId: IdType, customComponentTemplateId: IdType){
        const template = await this.findCustomComponentTemplateById(requesterUserId, customComponentTemplateId)
        await this.checkIfUserCanModifiyProject( template.projectId, requesterUserId )
        await CustomComponentController.deleteInstancesOnTemplateDelete( customComponentTemplateId )
        await DatabaseManager.deleteDocument( CustomComponentTemplate.COLLECTION, customComponentTemplateId )
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static async checkIfUserCanModifiyProject(projectId: IdType, requesterUserId: IdType){
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        ProjectController.checkIfUserHasPermissionToModifyContent(project, requesterUserId)
    }

    private static async checkIfUserCanWatchProject(projectId: IdType, requesterUserId: IdType){
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        ProjectController.checkIfUserHasPermissionInProject(project, requesterUserId)
    }

    private static getDataFromCreateRequest(data: any): CustomComponentTemplateDataType{
        let requestData: CustomComponentTemplateDataType = {
            ...data,
            _id: DatabaseManager.generateObjectId(),
            projectId: ObjectUtils.getIdAsObjectId(data.projectId)
        }
        return requestData
    }

    private static getDataFromUpdateRequest(newData: any, originalCCTemplate: any): CustomComponentTemplateDataType{
        let requestData = {
            ...newData,
            _id: ObjectUtils.getIdAsObjectId(newData._id),
            projectId: ObjectUtils.getIdAsObjectId(originalCCTemplate.projectId)
        }
        return requestData
    }

}