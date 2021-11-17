import { Collaborator } from "../models/projects/Collaborator";
import { Project, ProjectDataType } from "../models/projects/Project";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { CustomComponentTemplateController } from "./CustomComponentTemplateController";
import { ElementController } from "./ElementController";
import { OrganizationController } from "./OrganizationController";

export class ProjectController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    public static async createEmptyProject(requesterUserId: IdType, data: any): Promise<Project>{
        const defaultData = this.getDataFromCreateRequest(data)
        await OrganizationController.checkIfUserBelongToOrganization(data.organizationId, requesterUserId)
        const newProject = new Project(defaultData)
        const adminCollaborator = new Collaborator({
            userId: ObjectUtils.getIdAsObjectId(requesterUserId),
            permissions: [Collaborator.P_ADMIN],
            role: 'Administrator'
        })
        newProject.addCollaborator(adminCollaborator)
        newProject.validate()
        return await DatabaseManager.createDocument(Project.COLLECTION, newProject)
    }

    public static async findProjectById(requesterUserId: IdType, projectId: IdType): Promise<Project>{
        const project = await DatabaseManager.findDocumentById(Project.COLLECTION, projectId, Project)
        ObjectUtils.throwExceptionIfNotExist( project, 'The project [' + projectId + '] was not found' )
        this.checkIfUserHasPermissionInProject(project, requesterUserId)
        return project
    }

    public static async findProjectsByUser(requesterUserId: IdType): Promise<Project[]>{
        const query = {"collaborators.userId": ObjectUtils.getIdAsObjectId(requesterUserId)}
        const projection = { collaborators: 0, "sections.pages": 0 }
        let projects: any[] =  await DatabaseManager.findProjectedDocumentsByQuery(Project.COLLECTION, query, projection)
        return this.getBasicDataFromProjects(projects)
    }

    public static async updateProjectFromExternalRequest(requesterUserId: IdType, data: ProjectDataType): Promise<Project>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        let updatedProject = await this.findProjectById( requesterUserId, data._id! )
        this.checkIfUserHasPermissionToModifyBasicData( updatedProject, requesterUserId )
        let updatedProjectData = this.getDataFromUpdateRequest( data, updatedProject )
        return await this.updateProject( requesterUserId, new Project( updatedProjectData ), true )
    }

    public static async updateProject(requesterUserId: IdType, updatedProject: Project, ignorePermission?: boolean): Promise<Project>{
        if ( !ignorePermission ){
            this.checkIfUserHasPermissionToModifyContent( updatedProject, requesterUserId )
        }
        updatedProject.setLastModificationDate(new Date())
        updatedProject.validate()
        await DatabaseManager.updateDocumentById(Project.COLLECTION, updatedProject.getId(), updatedProject)
        return updatedProject
    }

    public static async updateLastModificationDate(projectId: IdType): Promise<void>{
        await DatabaseManager.updateDocumentById(Project.COLLECTION, projectId, {lastModificationDate: new Date()})
    }

    public static async updateTimes(requesterUserId: IdType, projectId: IdType, pageId: IdType, startTime: number, endTime: number): Promise<void> {
        const project = await this.findProjectById(requesterUserId, projectId)
        for(let i=0; i<project.sections.length; i++){
            const currSection = project.sections[i]
            for(let j=0; j<currSection.pages.length; j++){
                const currPage = currSection.pages[j]
                let changed = false
                if ( ObjectUtils.compareIds(currPage._id!, pageId) ){
                    if ( currPage.startTime > startTime ){
                        currPage.startTime = startTime
                        changed = true
                    }
                    if ( currPage.endTime < endTime ){
                        currPage.endTime = endTime
                        changed = true
                    }
                    if ( currSection.startTime > startTime ){
                        currSection.startTime = startTime
                        changed = true
                    }
                    if ( currSection.endTime < endTime ){
                        currSection.endTime = endTime
                        changed = true
                    }
                    if ( changed ){
                        await this.updateProject(requesterUserId, project, true)
                    }
                    return
                }
            }
        }
        throw Error(`The Page [${pageId}] does not exist in any Section of the Project [${projectId}]`)
    }

    public static async deleteProject(requesterUserId: IdType, projectId: IdType): Promise<void>{
        const project = await this.findProjectById( requesterUserId, projectId )
        this.checkIfUserHasPermissionToDeleteProject( project, requesterUserId )
        await DatabaseManager.deleteDocument(Project.COLLECTION, projectId)
        project.sections.forEach( (section)=>{
            section.pages.forEach( (page)=>{
                ElementController.deleteElementsByPageId( page._id! )
            } )
        } )
    }

    public static async exportProject(requesterUserId: IdType, projectId: IdType): Promise<any>{
        let project: any = await ProjectController.findProjectById(requesterUserId, projectId)
        project.customComponentTemplates = await CustomComponentTemplateController.findCustomComponentTemplatesByProject(requesterUserId, projectId)
        for(let i in project.sections){
            for(let j in project.sections[i].pages){
                let elements = await ElementController.findElementsByPageId(requesterUserId, projectId, project.sections[i].pages[j]._id)
                project.sections[i].pages[j].elements = elements
            }
        }
        delete project.collaborators
        delete project.organizationId
        return project
    }

    //-----------------------------------------------------------------------
    // Authorization methods
    //-----------------------------------------------------------------------

    public static checkIfUserHasPermissionInProject(project: Project, requesterUserId: IdType){
        project.findUserCollaborator( ObjectUtils.getIdAsObjectId(requesterUserId) )
    }

    public static checkIfUserHasPermissionToModifyContent(project: Project, requesterUserId: IdType){
        if ( !project.userHasPermission(ObjectUtils.getIdAsObjectId(requesterUserId), Collaborator.P_MODIFY_CONTENT) ){
            throw Error('The User [' + requesterUserId + '] does not have permission to modify the content' +
                ' of the Project [' + project.getId() + ']')
        }
    }

    private static checkIfUserHasPermissionToModifyBasicData(project: Project, requesterUserId: IdType){
        if ( !project.userHasPermission(ObjectUtils.getIdAsObjectId(requesterUserId), Collaborator.P_MODIFY_DATA) ){
            throw Error('The User [' + requesterUserId + '] does not have permission to modify the project data' +
                ' of the Project [' + project.getId() + ']')
        }
    }

    private static checkIfUserHasPermissionToDeleteProject(project: Project, requesterUserId: IdType){
        if ( !project.userHasPermission(ObjectUtils.getIdAsObjectId(requesterUserId), Collaborator.P_ADMIN) ){
            throw Error('The User [' + requesterUserId + '] does not have permission to delete the Project [' + project.getId() + ']')
        }
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static getDataFromCreateRequest(data: any): ProjectDataType{
        return {
            organizationId: ObjectUtils.getIdAsObjectId(data.organizationId),
            name: data.name,
            description: data.description,
            collaborators: [],
            creationDate: new Date(),
            lastModificationDate: new Date(),
            sections: [],
            version: 1
        }
    }

    private static getDataFromUpdateRequest(newData: any, originalProject: Project): ProjectDataType{
        const originalProjectData = originalProject as unknown as ProjectDataType
        return {
            ...originalProjectData,
            name: newData.name,
            description: newData.description,
            version: newData.version,
            lastModificationDate: new Date(),
            organizationId: ObjectUtils.getIdAsObjectId(originalProject.organizationId)
        } as ProjectDataType
    }

    private static getBasicDataFromProjects(projects:any[]): any[]{
        return projects.map( (e:any) => {
            e.sectionsNumber = e.sections.length
            let min = Infinity, max = -Infinity
            e.sections.forEach((itSection: any) => {
                if ( itSection.startTime < min ){
                    min = itSection.startTime
                }
                if ( itSection.endTime > max ){
                    max = itSection.endTime
                }
            });
            e.duration = (min!==Infinity) ? max - min : 0
            delete e.sections
            return e
        })
    }


}