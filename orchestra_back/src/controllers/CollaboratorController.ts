import { Collaborator, CollaboratorDataType } from "../models/projects/Collaborator";
import { Project } from "../models/projects/Project";
import { User } from "../models/users/User";
import { IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { OrganizationController } from "./OrganizationController";
import { ProjectController } from "./ProjectController";
import { UserController } from "./UserController";

export class CollaboratorController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    static async addCollaborator(requesterUserId: IdType, projectId: IdType, data: CollaboratorDataType): Promise<Collaborator>{
        const collaboratorData = this.getDataFromRequest( data )
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        await OrganizationController.checkIfUserBelongToOrganization(project.getOrganizationId(), data.userId)
        this.checkIfUserIsAuthorizedToModifyCollaborators(requesterUserId, project)
        const collaboratorObject = new Collaborator( collaboratorData )
        project.addCollaborator( collaboratorObject )
        await ProjectController.updateProject(requesterUserId, project)
        return collaboratorObject
    }

    static async findCollaboratorById(requesterUserId: IdType, projectId: IdType, searchedUserId: IdType, includeUserData?: boolean): Promise<Collaborator>{
        const project: Project = await ProjectController.findProjectById(requesterUserId, projectId)
        let collaborator = project.findUserCollaborator( ObjectUtils.getIdAsObjectId(searchedUserId) )
        if ( includeUserData ){
            let userData = await UserController.findUserById( collaborator.getUserId() )
            return this.addUserDataToCollaboratorObject(collaborator, userData)
        }
        return collaborator
    }

    static async getCollaborators(requesterUserId: IdType, projectId: IdType, includeUserData?: boolean): Promise<Collaborator[]>{
        const project: Project = await ProjectController.findProjectById(requesterUserId, projectId)
        const collaborators = project.getCollaborators()
        if ( includeUserData ){
            const userIds = collaborators.map( e => e.getUserId() )
            const usersData = await UserController.findUsersById( userIds )
            const sortedUsers = this.sortUserDataArrayByCollaborator( collaborators, usersData )
            return collaborators.map( (itColl, index) => this.addUserDataToCollaboratorObject( itColl, sortedUsers[index] ) )
        }
        return collaborators
    }

    static async updateCollaboratorFromExternalRequest(requesterUserId: IdType, projectId: IdType, updatedData: CollaboratorDataType): Promise<Collaborator>{
        const updatedCollaborator = this.getDataFromRequest( updatedData )
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        return await this.updateCollaborator(requesterUserId, project, new Collaborator(updatedCollaborator))
    }

    static async updateCollaborator(requesterUserId: IdType, project: Project, updatedCollaborator: Collaborator): Promise<Collaborator>{    
        this.checkIfUserIsAuthorizedToModifyCollaborators(requesterUserId, project)
        project.updateCollaborator(updatedCollaborator)
        await ProjectController.updateProject(requesterUserId, project, true)
        return updatedCollaborator
    }

    static async deleteCollaborator(requesterUserId: IdType, projectId: IdType, deletedCollaboratorId: IdType): Promise<void>{
        const project = await ProjectController.findProjectById(requesterUserId, projectId)
        let ignoreIfSelfDeleted = true
        if ( !ObjectUtils.compareIds( requesterUserId, deletedCollaboratorId ) ){
            this.checkIfUserIsAuthorizedToModifyCollaborators(requesterUserId, project)
            ignoreIfSelfDeleted = false
        }
        project.deleteCollaborator( ObjectUtils.getIdAsObjectId(deletedCollaboratorId) )
        await ProjectController.updateProject(requesterUserId, project, ignoreIfSelfDeleted)
    }
    
    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static addUserDataToCollaboratorObject(collaborator: any, userData: any): any{
        collaborator['user'] = userData
        delete collaborator['userId']
        return collaborator
    }

    private static sortUserDataArrayByCollaborator(collaboratorsArray: Collaborator[], userDataArray: User[]): any{
        return collaboratorsArray.map( itColl => userDataArray.find( user => user.compareById( itColl.getUserId() ) ) )
    }

    private static checkIfUserIsAuthorizedToModifyCollaborators(requesterUserId: IdType, project: Project): void{
        if ( !project.userHasPermission( ObjectUtils.getIdAsObjectId(requesterUserId), Collaborator.P_ADMIN ) ){
            throw Error('The User [' + requesterUserId + '] does not have permission to modify the collaborators'
                + ' list in the project [' + project.getId() + ']')
        }
    }

    private static getDataFromRequest(data: any): CollaboratorDataType{
        return {
            ...data,
            userId: ObjectUtils.getIdAsObjectId( data.userId ),
        }
    }

}