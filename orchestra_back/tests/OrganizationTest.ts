//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { OrganizationController } from '../src/controllers/OrganizationController';
import { UserController } from '../src/controllers/UserController';
import { Organization, OrganizationDataType } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, user1: User
let mainOrganizationId: ObjectId

describe('Create Organization', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(User.COLLECTION, Organization.COLLECTION)
        creator = await UserController.createUser( TestUtils.createUserObject({email: "johndoe1@gmail.com"}) )
        user1 = await UserController.createUser( TestUtils.createUserObject({email: "johndoe2@gmail.com"}) )
    })

    it('PASS: Create empty Organization', async()=>{
        const organizationData = TestUtils.createOrganizationObject()
        const response = await OrganizationController.createEmptyOrganization(creator._id, organizationData)
        const expectedMethodResponse = new Organization({
            ...organizationData,
            _id: response._id,
            userIds: [creator._id]
        })
        mainOrganizationId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored', async()=>{
        const organizationData = TestUtils.createOrganizationObject()
        const response = await OrganizationController.createEmptyOrganization(creator._id, {...organizationData, extraField: "FOO"})
        const expectedMethodResponse = new Organization({
            ...organizationData,
            _id: response._id,
            userIds: [creator._id]
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const organization: OrganizationDataType = TestUtils.createOrganizationObject()
        delete organization.country
        await rejects( async()=>{
            await OrganizationController.createEmptyOrganization(creator._id!, organization)
        })
    })

    it('FAIL: Wrong type information should be rejected', async()=>{
        const organization: OrganizationDataType = TestUtils.createOrganizationObject()
        organization.country = 5
        await rejects( async()=>{
            await OrganizationController.createEmptyOrganization(creator._id!, organization)
        })
    })

    it('FAIL: Wrong owner userId should be rejected', async()=>{
        const organization: OrganizationDataType = TestUtils.createOrganizationObject()
        await rejects( async()=>{
            await OrganizationController.createEmptyOrganization(creator._id + 'Wrong', organization)
        })
    })

    it('PASS: userIds array should be ignored on creation input data', async()=>{
        const organization: OrganizationDataType = TestUtils.createOrganizationObject()
        organization.userIds = 'WRONG TYPE'
        const response = await OrganizationController.createEmptyOrganization(creator._id!, organization)
        assert.exists(response)
    })

    it('FAIL: Creator User does not exist', async()=>{
        const organization: OrganizationDataType = TestUtils.createOrganizationObject()
        await rejects( async()=>{
            await OrganizationController.createEmptyOrganization(DatabaseManager.generateObjectId(), organization)
        })
    })    
})

describe('Find Organization', ()=>{

    before( async()=>{
        await OrganizationController.addUserByMail(creator._id, mainOrganizationId, user1.email)
    })

    it('PASS: Find by creator', async()=>{
        const organizationData: OrganizationDataType = TestUtils.createOrganizationObject()
        const response = await OrganizationController.findOrganizationById(creator._id, mainOrganizationId)
        const expectedMethodResponse = new Organization({
            ...organizationData,
            _id: mainOrganizationId,
            userIds: [creator._id, user1._id]
            
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the Organization', async()=>{
        const response = await OrganizationController.findOrganizationById(user1._id, mainOrganizationId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await OrganizationController.findOrganizationById(DatabaseManager.generateObjectId(), mainOrganizationId)
        })        
    })

    it('FAIL: Organization does not exist', async()=>{
        await rejects( async()=>{
            await OrganizationController.findOrganizationById(creator._id, DatabaseManager.generateObjectId())
        })        
    })
    
})

describe('Update Organization', ()=>{

    it('PASS: Update by creator', async()=>{
        const organizationData = await OrganizationController.findOrganizationById(creator._id, mainOrganizationId)
        organizationData.name = "Modified"
        const organization = new Organization(organizationData)
        const response = await OrganizationController.updateOrganization(creator._id, organization)
        const expectedMethodResponse = new Organization({
            ...organizationData,
            _id: mainOrganizationId,
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const organizationData = await OrganizationController.findOrganizationById(creator._id, mainOrganizationId)
        organizationData.name = "Modified"
        const organization = new Organization(organizationData)
        const response = await OrganizationController.updateOrganization(user1._id, organization)
        assert.exists(response)
    })

    it('FAIL: Updated by a external User', async()=>{
        const organizationData = await OrganizationController.createEmptyOrganization( creator._id, TestUtils.createOrganizationObject() )
        await rejects( async()=>{
            await OrganizationController.updateOrganization(DatabaseManager.generateObjectId(), new Organization(organizationData))
        })
    })

    it('FAIL: Extra information should be rejected on update', async()=>{
        const organizationData = await OrganizationController.createEmptyOrganization( creator._id, TestUtils.createOrganizationObject() )
        organizationData.extraField = "FOO"
        await rejects( async()=>{
            await OrganizationController.updateOrganization(creator._id, new Organization(organizationData))
        })
    })

    it('FAIL: Wrong input data be rejected', async()=>{
        const organizationData = await OrganizationController.createEmptyOrganization( creator._id, TestUtils.createOrganizationObject() )
        organizationData.name = true
        await rejects( async()=>{
            await OrganizationController.updateOrganization(creator._id, new Organization(organizationData))
        })
    })

    it('FAIL: OrganizationId is not present', async()=>{
        const organizationData = await OrganizationController.createEmptyOrganization( creator._id, TestUtils.createOrganizationObject() )
        delete organizationData._id
        await rejects( async()=>{
            await OrganizationController.updateOrganization(creator._id, organizationData)
        })
    })

    it('FAIL: Organization does not exist', async()=>{
        const organizationData: OrganizationDataType = TestUtils.createOrganizationObject()
        organizationData._id = DatabaseManager.generateObjectId()
        await rejects( async()=>{    
            await OrganizationController.updateOrganization(creator._id, new Organization(organizationData))
        })        
    })

    it('FAIL: OrganizationId is in a bad format', async()=>{
        const organizationData: OrganizationDataType = TestUtils.createOrganizationObject()
        organizationData._id = DatabaseManager.generateObjectId()
        await rejects( async()=>{
            await OrganizationController.updateOrganization(creator._id, new Organization(organizationData))
        })        
    })
})

describe('Delete Organization', ()=>{

    it('PASS: Organization Deleted by the Creator', async()=>{
        const organization = await OrganizationController.createEmptyOrganization(creator._id, TestUtils.createOrganizationObject())
        await OrganizationController.deleteOrganization(creator._id, organization._id)
        assert.ok('Deleted')
    })

    it('FAIL: Organization only can be deleted by their creator', async()=>{
        const organization = await OrganizationController.createEmptyOrganization(creator._id, TestUtils.createOrganizationObject())
        organization.addUser(user1._id)
        await rejects( async()=>{
            await OrganizationController.deleteOrganization(user1._id, organization._id)
        })
    })

    it('FAIL: Organization does not exist', async()=>{
        rejects( async()=>{
            await OrganizationController.deleteOrganization(user1._id, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: OrganizationId is wrong formatted', async()=>{
        rejects( async()=>{
            await OrganizationController.deleteOrganization(user1._id, mainOrganizationId + 'A')
        })
    })

    it('FAIL: UserId is wrong formatted', async()=>{
        rejects( async()=>{
            await OrganizationController.deleteOrganization(user1._id + 'ID', mainOrganizationId )
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(User.COLLECTION, Organization.COLLECTION)    
})