//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { OrganizationController } from '../src/controllers/OrganizationController';
import { ProjectController } from '../src/controllers/ProjectController';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Project } from '../src/models/projects/Project';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, userToAdd1: User, userToAdd2: User, userToAdd3: User, userToAdd4: User, userRejected: User
let organization: Organization
let project: Project

describe('Create Collaborator', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
        const initEnvironment = await TestUtils.createInitialEnvironment(5)
        creator = initEnvironment.creator
        userToAdd1 = initEnvironment.users[0]
        userToAdd2 = initEnvironment.users[1]
        userToAdd3 = initEnvironment.users[2]
        userRejected = initEnvironment.users[3]
        userToAdd4 = initEnvironment.users[4]
        organization = initEnvironment.organization
        project = initEnvironment.project
        await OrganizationController.removeUser(creator._id!, organization._id!, userRejected._id!)
    })

    it('PASS: Added by creator', async()=>{
        const collaborator1 = TestUtils.createCollaboratorObject(userToAdd1._id!, {permissions: [Collaborator.P_ADMIN]})
        const response = await CollaboratorController.addCollaborator(creator._id!, project._id!, collaborator1)
        const expectedMethodResponse = new Collaborator({
            ...collaborator1
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Added by a second Admin', async()=>{
        const collaborator2 = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions: [Collaborator.P_MODIFY_CONTENT]})
        const response = await CollaboratorController.addCollaborator(userToAdd1._id!, project._id!, collaborator2)
        const expectedMethodResponse = new Collaborator({
            ...collaborator2
        })    
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Added with empty permissions', async()=>{
        const collaborator3 = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions: []})
        const response = await CollaboratorController.addCollaborator(userToAdd1._id!, project._id!, collaborator3)
        const expectedMethodResponse = new Collaborator({
            ...collaborator3
        })    
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: A non-admin User is not allowed to add other Users', async()=>{
        const collaborator3 = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions: [Collaborator.P_MODIFY_CONTENT]})
        await rejects(async() => {
            await CollaboratorController.addCollaborator(userToAdd2._id!, project._id!, collaborator3)
        })
    })

    it('FAIL: A User cannot be added as Collaborator twice', async()=>{
        const collaborator2 = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions: [Collaborator.P_MODIFY_CONTENT]})
        await rejects(async() => {
            await CollaboratorController.addCollaborator(creator._id!, project._id!, collaborator2)
        })
    })

    it('FAIL: A User cannot be added if it does not belong to the Organization', async()=>{
        const rejectedCollab = TestUtils.createCollaboratorObject(userRejected._id!, {permissions: [Collaborator.P_MODIFY_CONTENT]})
        await rejects(async() => {
            await CollaboratorController.addCollaborator(creator._id!, project._id!, rejectedCollab)
        })
    })

    it('FAIL: Wrong properties on creation', async()=>{
        const collaborator3: any = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions: [Collaborator.P_MODIFY_CONTENT]})
        collaborator3['otherField'] = 10
        await rejects(async() => {
            await CollaboratorController.addCollaborator(creator._id!, project._id!, collaborator3)
        })
    })

    it('FAIL: Wrong permission on creation', async()=>{
        const collaborator3: any = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions: ['Not exist permission']})
        await rejects(async() => {
            await CollaboratorController.addCollaborator(creator._id!, project._id!, collaborator3)
        })
    })
})

describe('Update Collaborator', async()=>{

    it( 'PASS: basic update', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions:[Collaborator.P_WATCH_PROJECT]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        let response = await CollaboratorController.updateCollaborator(creator._id!, currProject, toUpdatedCollab as Collaborator)
        assert.deepEqual(toUpdatedCollab, response)
    })

    it( 'PASS: Admin Collaborator modify to other Collaborator', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd1._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        let response = await CollaboratorController.updateCollaborator(creator._id!, currProject, toUpdatedCollab as Collaborator)
        assert.deepEqual(toUpdatedCollab, response)
    })

    it( 'FAIL: A non-admin collaborator cannot modify to other Collaborator', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })
    
    it( 'FAIL: Less information should be rejected 1', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        delete toUpdatedCollab.role
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Less information should be rejected 2', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        delete toUpdatedCollab.permissions
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Less information should be rejected 3', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        delete toUpdatedCollab.userId
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Wrong Id type should be rejected', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_MODIFY_DATA]})
        toUpdatedCollab.userId = toUpdatedCollab.userId + ''
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Wrong Permissions should be rejected 1', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:["WRONG"]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Wrong Permissions should be rejected 2', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_ADMIN.toLowerCase()]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Wrong Permissions should be rejected 3', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_ADMIN.toUpperCase()]})
        toUpdatedCollab = new Collaborator(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: Wrong object should be rejected', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_ADMIN.toUpperCase()]})
        toUpdatedCollab = new User(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    })

    it( 'FAIL: An User cannot escalate privileges privileges', async()=>{
        const currProject = await ProjectController.findProjectById(creator._id!, project._id!)
        let toUpdatedCollab = TestUtils.createCollaboratorObject(userToAdd2._id!, {permissions:[Collaborator.P_ADMIN]})
        toUpdatedCollab = new User(toUpdatedCollab)
        await rejects(async() => {
            await CollaboratorController.updateCollaborator(userToAdd3._id!, currProject, toUpdatedCollab as Collaborator)
        })
    }) 
})

describe('Find Collaborator', async()=>{

    it( 'PASS: Find by User id', async()=>{
        const searchedUserId = userToAdd3._id!
        const response = await CollaboratorController.findCollaboratorById(creator._id!, project._id, searchedUserId)
        const expectedResponse = TestUtils.createCollaboratorObject(userToAdd3._id!, {permissions: [Collaborator.P_WATCH_PROJECT]})
        assert.deepEqual(response, expectedResponse)
    })

    it( 'FAIL: User does not exists as Collaborator', async()=>{
        const notExistId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await CollaboratorController.findCollaboratorById(creator._id!, project._id!, notExistId)
        })
    })

    it( 'FAIL: Requester user does not exist', async()=>{
        const notExistId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await CollaboratorController.findCollaboratorById(notExistId, project._id!, creator._id)
        })
    })

    it( 'FAIL: Bad formatted User Id', async()=>{
        const notExistId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await CollaboratorController.findCollaboratorById(creator._id, project._id!, creator._id + '1')
        })
    })

    it( 'FAIL: Bad formatted Project Id', async()=>{
        const notExistId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await CollaboratorController.findCollaboratorById(creator._id, project._id + '1', creator._id)
        })
    })

    it( 'FAIL: Wrong Id type', async()=>{
        const notExistId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await CollaboratorController.findCollaboratorById(creator._id, 5, creator._id)
        })
    })
})

describe('Delete Collaborator', async()=>{

    it( 'PASS: Delete by User id', async()=>{
        const toDeleteId = userToAdd3._id!
        await CollaboratorController.deleteCollaborator(creator._id!, project._id, toDeleteId)
        assert.ok('Deleted')
    })

    it( 'PASS: Delete by the owner of the role', async()=>{
        const toDeleteId = userToAdd3._id!
        await CollaboratorController.deleteCollaborator(userToAdd1._id!, project._id, userToAdd1._id)
        assert.ok('Deleted')
    })

    it( 'FAIL: Collaborator is already deleted', async()=>{
        const notExistId = userToAdd3._id!
        await rejects(async() => {
            await CollaboratorController.deleteCollaborator(creator._id!, project._id!, notExistId)
        })
    })

    it( 'FAIL: Collaborator does not have permission', async()=>{
        const notExistId = userToAdd3._id!
        await rejects(async() => {
            await CollaboratorController.deleteCollaborator(creator._id!, project._id!, notExistId)
        })
    })    
})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
})