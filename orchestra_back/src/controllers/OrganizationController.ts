import { Organization, OrganizationDataType } from "../models/users/Organization";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { UserController } from "./UserController";

//TODO: Check members permissions
export class OrganizationController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    public static async createEmptyOrganization(requesterUserId: IdType, data: any): Promise <Organization>{
        const defaultData: OrganizationDataType = this.getDataFromCreateRequest(data)
        const newOrganization = new Organization(defaultData)
        await UserController.findUserById( requesterUserId )
        newOrganization.addUser( ObjectUtils.getIdAsObjectId(requesterUserId) )
        newOrganization.validate()
        return new Organization(await DatabaseManager.createDocument(Organization.COLLECTION, newOrganization))
    }

    public static async findOrganizationById(requesterUserId: IdType, organizationId: IdType): Promise<Organization>{
        const organization = await this.findOrganization(organizationId)
        this.checkIfUserHasAccessToOrganizationData( organization, requesterUserId )
        return organization
    }

    public static async findOrganizationsByUser(requesterUserId: IdType): Promise<any[]>{
        const query = {userIds: ObjectUtils.getIdAsObjectId(requesterUserId)}
        return await DatabaseManager.findDocumentsByQuery(Organization.COLLECTION, query)
    }

    public static async updateOrganizationFromExternalRequest(requesterUserId: IdType, data: OrganizationDataType): Promise<Organization>{
        ObjectUtils.throwExceptionIfNotExist( data._id, 'Undefined _id field in request body' )
        const originalOrganization = await this.findOrganizationById(requesterUserId, data._id!)
        const updatedOrganizationData = this.getDataFromUpdateRequest(data, originalOrganization)
        const updatedOrganization = new Organization( updatedOrganizationData )
        return await this.updateOrganization( requesterUserId, updatedOrganization )
    }

    public static async updateOrganization(requesterUserId: IdType, updatedOrganization: Organization): Promise<Organization>{
        updatedOrganization.validate()
        this.checkIfUserCanModifyOrganizationData(updatedOrganization, requesterUserId)
        await DatabaseManager.updateDocumentById(Organization.COLLECTION, updatedOrganization.getId(), updatedOrganization)
        return updatedOrganization
    }

    public static async deleteOrganization(requesterUserId: IdType, organizationId: IdType): Promise<void>{
        const organization = await this.findOrganizationById( requesterUserId, organizationId )
        this.checkIfUserCanModifyOrganizationData(organization, requesterUserId)
        await DatabaseManager.deleteDocument(Organization.COLLECTION, organizationId)
    }

    //-----------------------------------------------------------------------
    // Members methods
    //-----------------------------------------------------------------------

    public static async addUserByMail(requesterUserId: IdType, organizationId: IdType, newUserMail: string): Promise<void>{
        const searchedUser = await UserController.findUserByEmail(newUserMail)
        await this.addUser(requesterUserId, organizationId, searchedUser._id!)
    }

    public static async addUser(requesterUserId: IdType, organizationId: IdType, newUserId: IdType): Promise<void>{
        const organization = await this.findOrganizationById( requesterUserId, organizationId )
        await UserController.findUserById(newUserId)
        organization.addUser( ObjectUtils.getIdAsObjectId(newUserId) )
        await this.updateOrganization(requesterUserId, organization)
    }

    public static async removeUser(requesterUserId: IdType, organizationId: IdType, removedUserId: IdType): Promise<void>{
        const organization = await this.findOrganizationById( requesterUserId, organizationId )
        organization.removeUser( ObjectUtils.getIdAsObjectId(removedUserId) )
        await this.updateOrganization(requesterUserId, organization)
    }

    //-----------------------------------------------------------------------
    // Authorization Methods
    //-----------------------------------------------------------------------

    public static async checkIfUserBelongToOrganization(organizationId: IdType, userId: IdType): Promise<void>{
        const organization = await this.findOrganization( organizationId )
        if ( !organization.hasUser( ObjectUtils.getIdAsObjectId(userId) ) ){
            throw Error('The User [' + userId + '] does not belong to the Organization [' + organizationId + ']' )
        }
    }

    private static checkIfUserHasAccessToOrganizationData(organization: Organization, requesterUserId: IdType){
        if ( !organization.hasUser( ObjectUtils.getIdAsObjectId(requesterUserId) ) ){
            throw Error('The User [' + requesterUserId + '] does not have access to the Organization [' + organization.getId() + '] data' )
        }
    }

    private static checkIfUserCanModifyOrganizationData(organization: Organization, requesterUserId: IdType){
        if ( !organization.hasUser( ObjectUtils.getIdAsObjectId(requesterUserId) ) ){
            throw Error('The User [' + requesterUserId + '] can not modify the Organization [' + organization.getId() + ']' )
        }
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static async findOrganization(organizationId: IdType): Promise<Organization>{
        const organization = await DatabaseManager.findDocumentById(Organization.COLLECTION, organizationId, Organization)
        ObjectUtils.throwExceptionIfNotExist( organization, 'The organization [' + organizationId + '] was not found' )
        return organization
    }

    private static getDataFromCreateRequest(data: any): OrganizationDataType{
        return {
            country: data.country,
            facebookUrl: data.facebookUrl,
            name: data.name,
            nit: data.nit,
            phoneNumber: data.phoneNumber,
            twitterUrl: data.twitterUrl,
            website: data.website,
            userIds: []
        }
    }

    private static getDataFromUpdateRequest(newData: any, originalOrganization: Organization): OrganizationDataType{
        const originalOrganizationData = originalOrganization as unknown as OrganizationDataType
        return {
            ...originalOrganizationData,
            country: newData.country,
            facebookUrl: newData.facebookUrl,
            name: newData.name,
            nit: newData.nit,
            phoneNumber: newData.phoneNumber,
            twitterUrl: newData.twitterUrl,
            website: newData.website,
        }
    }

}