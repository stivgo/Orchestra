import { OrganizationController } from "../src/controllers/OrganizationController";
import { ProjectController } from "../src/controllers/ProjectController";
import { UserController } from "../src/controllers/UserController";
import { ElementDataType } from "../src/models/elements/abstractElements/Element";
import { CustomComponentTemplate } from "../src/models/elements/custom/CustomComponentTemplate";
import { Paragraph } from "../src/models/elements/text/Paragraph";
import { CollaboratorDataType } from "../src/models/projects/Collaborator";
import { PageDataType } from "../src/models/projects/Page";
import { ProjectDataType } from "../src/models/projects/Project";
import { SectionDataType } from "../src/models/projects/Section";
import { OrganizationDataType } from "../src/models/users/Organization";
import { DatabaseManager, IdType } from "../src/utils/DatabaseManager";
import ObjectUtils from "../src/utils/ObjectUtils";

const Configuration = require('../src/config/Configuration')

export class TestUtils {

    public CONFIG = Configuration

    //-----------------------------------------------------------------------
    // Database
    //-----------------------------------------------------------------------

    public static async connectDatabase(){
        await DatabaseManager.connect( Configuration.DB_CONNECTION_STRING )
    }

    public static async disconnectDatabase(){
        await DatabaseManager.disconnect( )
    }

    public static async clearCollection(...collections: string[]){
        for(let i=0; i<collections.length; i++){
            await DatabaseManager.deleteDocumentsByQuery(collections[i], {})
        }
        
    }

    //-----------------------------------------------------------------------
    // Initial environment
    //-----------------------------------------------------------------------

    public static async createInitialEnvironment(usersNumber: number){
        const creator = await UserController.createUser( TestUtils.createUserObject({email: "creator@gmail.com"}) )
        const users = []
        for(let i=0; i<usersNumber; i++){
            users[i] = await UserController.createUser( TestUtils.createUserObject({email: `user${(i+1)}@gmail.com`}) )
        }
        const organization = await OrganizationController.createEmptyOrganization(creator._id!, TestUtils.createOrganizationObject() )
        const project = await ProjectController.createEmptyProject(creator._id!, TestUtils.createProjectObject(organization._id!))
        for(let i=0; i<usersNumber; i++){
            await OrganizationController.addUser(creator._id!, organization._id!, users[i]._id!)
        }
        return {creator, users, project, organization}
    }

    //-----------------------------------------------------------------------
    // Objects
    //-----------------------------------------------------------------------

    public static createUserObject(aditionalData?: any){
        return {
            email: "JoHnDoE@gmail.com",
            password: "myPassword",
            firstName: "John",
            lastName: "Doe",
            ...aditionalData
        }
    }

    public static createCollaboratorObject(userId: IdType, aditionalData?: any): CollaboratorDataType{
        return {
            permissions: ['Admin'],
            role: "Admin",
            userId: ObjectUtils.getIdAsObjectId(userId),
            ...aditionalData
        }
    }

    public static createProjectObject(organizationId: IdType, aditionalData?: any): ProjectDataType{
        return {
            collaborators: [],
            creationDate: new Date(),
            description: "basic Project",
            lastModificationDate: new Date(),
            name: "Project Name",
            organizationId: ObjectUtils.getIdAsObjectId(organizationId),
            sections: [],
            version: 1,
            ...aditionalData
        }
    }

    public static createOrganizationObject(aditionalData?: any): OrganizationDataType{
        return {
            country: "Colombia",
            facebookUrl: "wwww.facebook.com",
            name: "TesosTV",
            nit: "1010101010-1",
            phoneNumber: "+57 3561234123",
            twitterUrl: "www.twitter.com",
            userIds: [],
            website: "wwww.tesostv.com.co",
            ...aditionalData
        }
    }

    public static createSectionObject(aditionalData?: any): SectionDataType{
        return {
            endTime: 0,
            startTime: 0,
            name: "Default section",
            number: 1,
            pages: [],
            ...aditionalData
        }
    }

    public static createPageObject(aditionalData?: any): PageDataType{
        return {
            endTime: 0,
            startTime: 0,
            description: 'default Page',
            name: 'default Page name',
            number: 1,
            ...aditionalData
        }
    }

    public static createElementObject(pageId: IdType, aditionalData?: any): ElementDataType{
        let element: ElementDataType = {
            events: [],
            height: 100,
            isActive: false,
            isLocked: false,
            isSelected: false,
            isVisible: false,
            isStatic: true,
            startTime: 0,
            styles: [{
                property: "display",
                value: "flex"
            },{
                property: "color",
                value: "red"
            },{
                property: "background-color",
                value: "white"
            }],
            stylesString: "display:flex;color:red;background-color:white",
            pageId: ObjectUtils.getIdAsObjectId(pageId),
            description: "basic element",
            endTime: 0,
            title: "Some title",
            type: "Paragraph",
            width: 100,
            xPosition: 0,
            yPosition: 0,
            zPosition: 1,
            ...aditionalData
        }
        if ( element.parentId ){
            element.parentId = ObjectUtils.getIdAsObjectId(element.parentId)
        }
        return element
    }

    public static createParagraphExampleObject(pageId: IdType, aditionalData?: any): ElementDataType{
        return this.createElementObject(pageId, {
            urlSource: "www.foo.com",
            isStatic: true,
            type: Paragraph.DATA_TYPE,
            content: "Lorem ipsum",
            ...aditionalData
        })
    }

    public static createTemplateObject(projectId: string, creator: string, aditionalData?: any): any{
        return {
            creationDate: new Date(),
            creator: creator.toString(),
            description: "Template description",
            name: "My Template",
            projectId: ObjectUtils.getIdAsObjectId(projectId),
            ...aditionalData
        }
    }

    public static createCustomComponentTemplateObject(projectId: string, aditionalData?: any): CustomComponentTemplate{
        const pageId = DatabaseManager.generateObjectId()
        return {
            defaultHeight: 100,
            defaultWidth: 100,
            name: 'CCT',
            description: 'Template Example',
            projectId: ObjectUtils.getIdAsObjectId(projectId),
            childComponents: [
                this.createElementObject(pageId, {
                    urlSource: "www.gooogle.com",
                    isStatic: true,
                    duration: 100,
                    type: 'Video'
                }),
                this.createElementObject(pageId, {
                    urlSource: "",
                    isStatic: true,
                    content: 'Paragraph content',
                    type: 'Paragraph'
                }),
                this.createElementObject(pageId, {
                    urlSource: "www.google.com",
                    isStatic: true,
                    alternativeText: 'Image alt text',
                    type: 'Image'
                })
            ],
            ...aditionalData
        }
    }

}