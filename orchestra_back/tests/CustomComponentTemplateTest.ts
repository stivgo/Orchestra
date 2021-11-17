//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { CustomComponentTemplateController } from '../src/controllers/CustomComponentTemplateController';
import { CustomComponentTemplate } from '../src/models/elements/custom/CustomComponentTemplate';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Project } from '../src/models/projects/Project';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

require('../src/LoadDataTypes')

let creator: User, user1: User, user2: User
let project: Project
let mainTemplateId: ObjectId

describe('Create CustomComponentTemplate', ()=>{

    before( async()=>{
       await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION, CustomComponentTemplate.COLLECTION)
        const initEnvironment = await TestUtils.createInitialEnvironment(2)
        creator = initEnvironment.creator
        user1 = initEnvironment.users[0]
        user2 = initEnvironment.users[1]
        project = initEnvironment.project
        await CollaboratorController.addCollaborator(creator._id, project._id, new Collaborator({
            permissions: [Collaborator.P_MODIFY_CONTENT, Collaborator.P_MODIFY_DATA],
            role: "Auxiliar",
            userId: user1._id
        }))
        await CollaboratorController.addCollaborator(creator._id, project._id, new Collaborator({
            permissions: [Collaborator.P_WATCH_PROJECT],
            role: "Watcher",
            userId: user2._id
        }))
    })

    it('PASS: Create CustomComponentTemplate', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        const response = await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, templateData)
        const expectedMethodResponse = new CustomComponentTemplate({
            ...templateData,
            _id: response._id,
        })
        mainTemplateId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Extra information should be rejected', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, {...templateData, extraInfo: "FOO"})
        })
    })

    it('FAIL: A non-Component child Element should be rejected', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        templateData.childComponents.push(TestUtils.createElementObject(DatabaseManager.generateObjectId(),{
            type: 'Layer'
        }))
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, {...templateData, extraInfo: "FOO"})
        })
    })

    it('FAIL: A bad formatted Element should be rejected', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        templateData.childComponents[0].description = 10
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, {...templateData, extraInfo: "FOO"})
        })
    })

    it('FAIL: Empty child Elements list should be rejected', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        templateData.childComponents = undefined
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, {...templateData, extraInfo: "FOO"})
        })
    })

    it('FAIL: Less information is not allowed', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        delete templateData.defaultHeight
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, {...templateData, extraInfo: "FOO"})
        })
    })

    it('PASS: Created by a Collaborator with enough permissions', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        const response = await CustomComponentTemplateController.createCustomComponentTemplate(user1._id, templateData)
        assert.exists(response)
    })

    it('FAIL: Creator User does not have enoguh permission', async()=>{
        const template: CustomComponentTemplateDataType = TestUtils.createCustomComponentTemplateObject(project._id)
        await rejects( async()=>{
            await CustomComponentTemplateController.createCustomComponentTemplate(user2._id, template)
        })
    })
})

describe('Find CustomComponentTemplate', ()=>{

    it('PASS: Find by the creator', async()=>{
        const templateData: CustomComponentTemplateDataType = TestUtils.createCustomComponentTemplateObject(project._id)
        const response = await CustomComponentTemplateController.findCustomComponentTemplateById(creator._id, mainTemplateId)
        const expectedMethodResponse = new CustomComponentTemplate({
            ...templateData,
            _id: mainTemplateId
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the CustomComponentTemplate with enough permissions (modify)', async()=>{
        const response = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        assert.exists(response)
    })

    it('PASS: Find by other memeber of the CustomComponentTemplate with enough permissions (watch)', async()=>{
        const response = await CustomComponentTemplateController.findCustomComponentTemplateById(user2._id, mainTemplateId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await CustomComponentTemplateController.findCustomComponentTemplateById(DatabaseManager.generateObjectId(), mainTemplateId)
        })        
    })

    it('FAIL: CustomComponentTemplate does not exist', async()=>{
        await rejects( async()=>{
            await CustomComponentTemplateController.findCustomComponentTemplateById(creator._id, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: Wrong Id should not be accepted', async()=>{
        await rejects( async()=>{
            await CustomComponentTemplateController.findCustomComponentTemplateById(creator._id, mainTemplateId + 'A')
        })
    })

    it('FAIL: Wrong Id type should not be accepted', async()=>{
        await rejects( async()=>{
            await CustomComponentTemplateController.findCustomComponentTemplateById(creator._id, 10)
        })
    })
    
})

describe('Update CustomComponentTemplate', ()=>{

    it('PASS: Update by creator', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(creator._id, mainTemplateId)
        templateData.description = "Modified"
        const template = new CustomComponentTemplate(templateData)
        const response = await CustomComponentTemplateController.updateCustomComponentTemplate(creator._id, template)
        const expectedMethodResponse = new CustomComponentTemplate({
            ...templateData,
            _id: mainTemplateId,
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        templateData.name = "Modified"
        const template = new CustomComponentTemplate(templateData)
        const response = await CustomComponentTemplateController.updateCustomComponentTemplate(user1._id, template)
        assert.exists(response)
    })

    it('PASS: Child components ids should be ignored', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        templateData.childComponents[0].pageId = 10
        templateData.childComponents[0].parentId = "10"
        const template = new CustomComponentTemplate(templateData)
        const response = await CustomComponentTemplateController.updateCustomComponentTemplate(user1._id, template)
        assert.exists(response)
    })

    it('FAIL: Updated by a Collaborator without enough permissions', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user2._id, mainTemplateId)
        templateData.name = "Modified"
        const template = new CustomComponentTemplate(templateData)
        rejects( async()=>{
            await CustomComponentTemplateController.updateCustomComponentTemplate(user2._id, template)
        })
    })

    it('FAIL: Updated by a external User', async()=>{
        const templateData: CustomComponentTemplateDataType = TestUtils.createCustomComponentTemplateObject()
        await rejects( async()=>{
            await CustomComponentTemplateController.updateCustomComponentTemplate(DatabaseManager.generateObjectId(), project._id, new CustomComponentTemplate(templateData))
        })
    })

    it('FAIL: CustomComponentTemplate does not exist', async()=>{
        await rejects( async()=>{
            const templateData: CustomComponentTemplateDataType = TestUtils.createCustomComponentTemplateObject()
            templateData._id = DatabaseManager.generateObjectId()
            await CustomComponentTemplateController.updateCustomComponentTemplate(creator._id, new CustomComponentTemplate(templateData))
        })        
    })
    
    it('PASS: Wrong updating information should be rejected', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        templateData.name = 5
        await rejects( async()=>{
            await CustomComponentTemplateController.updateCustomComponentTemplate(user1._id, template)
        })
    })

    it('PASS: Wrong child Elements should be rejected', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        templateData.childComponents.push(TestUtils.createElementObject(DatabaseManager.generateObjectId(),{
            type: 'Layer'
        }))
        await rejects( async()=>{
            await CustomComponentTemplateController.updateCustomComponentTemplate(user1._id, template)
        })
    })

    it('PASS: Wrong child Elements should be rejected', async()=>{
        const templateData = await CustomComponentTemplateController.findCustomComponentTemplateById(user1._id, mainTemplateId)
        templateData.childComponents[0].isActive = "TRUE"
        await rejects( async()=>{
            await CustomComponentTemplateController.updateCustomComponentTemplate(user1._id, template)
        })
    })
})

describe('Delete CustomComponentTemplate', ()=>{

    it('PASS: CustomComponentTemplate deleted by the Creator', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        const template = await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, templateData)
        await CustomComponentTemplateController.deleteCustomComponentTemplate(creator._id, template._id)
        assert.ok('Deleted')
    })

    it('PASS: CustomComponentTemplate deleted by a Collaborator with enough permissions', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        const template = await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, templateData)
        await CustomComponentTemplateController.deleteCustomComponentTemplate(user1._id, template._id)
        assert.ok('Deleted')
    })

    it('FAIL: CustomComponentTemplate cannot be deleted by a Collaborator without enough permissions', async()=>{
        const templateData = TestUtils.createCustomComponentTemplateObject(project._id)
        const template = await CustomComponentTemplateController.createCustomComponentTemplate(creator._id, templateData)
        await rejects( async()=>{
            await CustomComponentTemplateController.deleteCustomComponentTemplate(user2._id, template._id)
        })
    })

    it('FAIL: CustomComponentTemplate does not exist', async()=>{
        rejects( async()=>{
            await CustomComponentTemplateController.deleteCustomComponentTemplate(user1._id, project._id, DatabaseManager.generateObjectId())
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION, CustomComponentTemplate.COLLECTION)
})

//*/