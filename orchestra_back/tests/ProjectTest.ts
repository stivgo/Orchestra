//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { ProjectController } from '../src/controllers/ProjectController';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Project, ProjectDataType } from '../src/models/projects/Project';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, user1: User
let organization: Organization
let mainProjectId: ObjectId

describe('Create Project', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Project.COLLECTION, User.COLLECTION, Organization.COLLECTION)
        const initEnvironment = await TestUtils.createInitialEnvironment(1)
        creator = initEnvironment.creator
        user1 = initEnvironment.users[0]
        organization = initEnvironment.organization
        await ProjectController.deleteProject(creator._id!, initEnvironment.project._id!)
    })

    it('PASS: Create empty project', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        const response = await ProjectController.createEmptyProject(creator._id!, projectData)
        const expectedMethodResponse = new Project({
            ...projectData,
            creationDate: response.creationDate,
            lastModificationDate: response.lastModificationDate,
            _id: response._id
        })
        const adminUser = new Collaborator( {userId: creator._id!, permissions: [Collaborator.P_ADMIN], role: "Administrator"} )
        expectedMethodResponse.addCollaborator( adminUser )
        mainProjectId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        const response = await ProjectController.createEmptyProject(creator._id!, {...projectData, extraField: "FOO"})
        const expectedMethodResponse = new Project({
            ...projectData,
            creationDate: response.creationDate,
            lastModificationDate: response.lastModificationDate,
            _id: response._id
        })
        const adminUser = new Collaborator( {userId: creator._id!, permissions: [Collaborator.P_ADMIN], role: "Administrator"} )
        expectedMethodResponse.addCollaborator( adminUser )
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        delete projectData.description
        await rejects( async()=>{
            await ProjectController.createEmptyProject(creator._id!, projectData)
        })
    })

    it('PASS: Sections array in input data should be ignored', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        const response = await ProjectController.createEmptyProject(creator._id!, {...projectData, sections: ["FOO"]})
        const expectedMethodResponse = new Project({
            ...projectData,
            creationDate: response.creationDate,
            lastModificationDate: response.lastModificationDate,
            _id: response._id
        })
        const adminUser = new Collaborator( {userId: creator._id!, permissions: [Collaborator.P_ADMIN], role: "Administrator"} )
        expectedMethodResponse.addCollaborator( adminUser )
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: LastModificationDate in input data should be ignored', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        projectData.lastModificationDate = new Date(2019,10,10)
        const response = await ProjectController.createEmptyProject(creator._id!, {...projectData, sections: ["FOO"]})
        assert.notEqual(response.lastModificationDate, projectData.lastModificationDate)
    })

    it('PASS: CreationDate in input data should be ignored', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        const response = await ProjectController.createEmptyProject(creator._id!, {...projectData, sections: ["FOO"]})
        assert.notEqual(response.creationDate, projectData.creationDate)
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        projectData.description = 50
        await rejects( async()=>{
            await ProjectController.createEmptyProject(creator._id!, projectData)
        })
    })

    it('FAIL: Creator User does not exist', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        await rejects( async()=>{
            await ProjectController.createEmptyProject(DatabaseManager.generateObjectId(), projectData)
        })
    })

    it('FAIL: Organization does not exist', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(DatabaseManager.generateObjectId())
        await rejects( async()=>{
            await ProjectController.createEmptyProject(creator._id, projectData)
        })
    })
    
})

describe('Find Project', ()=>{

    before( async()=>{
        let collabData = TestUtils.createCollaboratorObject(user1._id, {permissions: [Collaborator.P_WATCH_PROJECT], role: "Other"})
        await CollaboratorController.addCollaborator(creator._id, mainProjectId, collabData)
    })

    it('PASS: Find by creator', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        const response = await ProjectController.findProjectById(creator._id, mainProjectId)
        const expectedMethodResponse = new Project({
            ...projectData,
            _id: mainProjectId,
            creationDate: response.creationDate,
            lastModificationDate: response.lastModificationDate,
            collaborators: response.collaborators
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by a Collaborator', async()=>{
        const response = await ProjectController.findProjectById(user1._id, mainProjectId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await ProjectController.findProjectById(DatabaseManager.generateObjectId(), mainProjectId)
        })        
    })

    it('FAIL: Project does not exist', async()=>{
        await rejects( async()=>{
            await ProjectController.findProjectById(creator._id, DatabaseManager.generateObjectId())
        })        
    })
    
})

describe('Update Project', ()=>{

    it('PASS: Update by creator', async()=>{
        const projectData = await ProjectController.findProjectById(creator._id, mainProjectId)
        projectData.name = "Modified"
        const project = new Project(projectData)
        const response = await ProjectController.updateProject(creator._id, project)
        const expectedMethodResponse = new Project({
            ...projectData,
            _id: mainProjectId,
            creationDate: response.creationDate,
            lastModificationDate: response.lastModificationDate,
            collaborators: response.collaborators
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: CreationDate in input data should be ignored', async()=>{
        const projectData = await ProjectController.findProjectById(creator._id, mainProjectId)
        projectData.lastModificationDate = new Date(2020, 10, 10)
        const project = new Project(projectData)
        const response = await ProjectController.updateProject(creator._id, project)
        assert.notEqual(response.lastModificationDate, projectData.lastModificationDate)
    })

    it('PASS: LastModificationDate in input data should be ignored', async()=>{
        const projectData = await ProjectController.findProjectById(creator._id, mainProjectId)
        projectData.lastModificationDate = new Date(2020, 10, 10)
        const project = new Project(projectData)
        const response = await ProjectController.updateProject(creator._id, project)
        assert.notEqual(response.lastModificationDate, projectData.lastModificationDate)
    })

    it('FAIL: Updated by a Collaborator without permission', async()=>{
        const projectData = await ProjectController.findProjectById(creator._id, mainProjectId)
        projectData.name = "FOO"
        await rejects( async()=>{
            await ProjectController.updateProject(user1._id, projectData)
        })
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const projectData = await ProjectController.findProjectById(creator._id, mainProjectId)
        CollaboratorController.updateCollaborator(creator._id, projectData, new Collaborator({
            userId: user1._id,
            permissions: [Collaborator.P_MODIFY_CONTENT, Collaborator.P_MODIFY_DATA],
            role: "Modifier"
        }))
        const response = await ProjectController.updateProject(user1._id, projectData)
        assert.exists(response)
    })

    it('FAIL: Updated by a external User', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        await rejects( async()=>{
            const response = await ProjectController.updateProject(DatabaseManager.generateObjectId(), new Project(projectData))
        })
    })

    it('FAIL: Updated by a User without enough permissions', async()=>{
        const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
        await rejects( async()=>{
            const response = await ProjectController.updateProject(DatabaseManager.generateObjectId(), new Project(projectData))
        })
    })

    it('FAIL: Project does not exist', async()=>{
        await rejects( async()=>{
            const projectData: ProjectDataType = TestUtils.createProjectObject(organization._id!)
            projectData._id = DatabaseManager.generateObjectId()
            await ProjectController.updateProject(creator._id, new Project(projectData))
        })        
    })
})

describe('Delete Project', ()=>{

    it('PASS: Project Deleted by the Creator', async()=>{
        const project = await ProjectController.createEmptyProject(creator._id, TestUtils.createProjectObject(organization._id))
        await ProjectController.deleteProject(creator._id, project._id)
        assert.ok('Deleted')
    })

    it('PASS: Project Deleted by a Collaborator with correct permission', async()=>{
        const project = await ProjectController.createEmptyProject(creator._id, TestUtils.createProjectObject(organization._id))
        const collaborator = await CollaboratorController.addCollaborator(creator._id, project._id, {
            userId: user1._id,
            permissions: [Collaborator.P_ADMIN],
            role: 'Second Administrator'
        })
        await ProjectController.deleteProject(user1._id, project._id)
        assert.ok('Deleted')
    })

    it('FAIL: Project cannot be deleted by a Collaborator without Administartor permission', async()=>{
        const project = await ProjectController.createEmptyProject(creator._id, TestUtils.createProjectObject(organization._id))
        const collaborator = CollaboratorController.addCollaborator(creator._id, project._id, {
            userId: user1._id,
            permissions: [Collaborator.P_MODIFY_CONTENT, Collaborator.P_MODIFY_DATA, Collaborator.P_WATCH_PROJECT],
            role: 'Non admin User'
        })
        rejects( async()=>{
            await ProjectController.deleteProject(user1._id, project._id)
        })
    })

    it('FAIL: Project does not exist', async()=>{
        rejects( async()=>{
            await ProjectController.deleteProject(user1, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: Wrong projectId should fail', async()=>{
        rejects( async()=>{
            await ProjectController.deleteProject(user1, mainProjectId + '.')
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, User.COLLECTION, Organization.COLLECTION)
})