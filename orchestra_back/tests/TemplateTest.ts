//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { ElementController } from '../src/controllers/ElementController';
import { PageController } from '../src/controllers/PageController';
import { SectionController } from '../src/controllers/SectionController';
import { TemplateController } from '../src/controllers/TemplateController';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Project } from '../src/models/projects/Project';
import { Template } from '../src/models/projects/Template';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, user1: User, user2: User
let project: Project
let mainTemplateId: ObjectId

describe('Create Template', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Template.COLLECTION, Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
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
        const section = await SectionController.createEmptySection(creator._id, project._id, TestUtils.createSectionObject())
        for(let i=0; i<3; i++){
            let page = await PageController.createEmptyPage(creator._id, project._id, section._id, TestUtils.createPageObject({number: i}), false)
            await ElementController.createElement(creator._id, project._id, TestUtils.createParagraphExampleObject(page._id, {title:"Element"+i}))
        }
    })

    it('PASS: Create basic Template', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const response = await TemplateController.createTemplateFromProject(creator._id, templateData)
        delete templateData.projectId
        const expectedMethodResponse = new Template({
            ...templateData,
            baseProject: response.baseProject,
            creationDate: response.creationDate,
            _id: response._id
        })
        mainTemplateId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        templateData.extraField = "FOO"
        const response = await TemplateController.createTemplateFromProject(creator._id, templateData)
        assert.exists(response)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        delete templateData.name
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        templateData.name = 5
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

    it('FAIL: Creator User does not exist', async()=>{
        const creatorId = DatabaseManager.generateObjectId()
        const templateData = TestUtils.createTemplateObject(project._id, creatorId)
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creatorId, templateData)
        })
    })

    it('FAIL: Based Project does not exist', async()=>{
        const templateData = TestUtils.createTemplateObject(DatabaseManager.generateObjectId(), creator._id)
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

})

describe('Find Template', ()=>{

    it('PASS: Find by the creator', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const response = await TemplateController.findTemplateById(mainTemplateId)
        delete templateData.projectId
        const expectedMethodResponse = new Template({
            ...templateData,
            baseProject: response.baseProject,
            creationDate: response.creationDate,
            _id: response._id
        })
        mainTemplateId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the Template with enough permissions (modify)', async()=>{
        await TestUtils.clearCollection(Template.COLLECTION)
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const nTemplates = 5
        for(let i=0; i<nTemplates; i++){
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        }
        const response = await TemplateController.findAllTemplates()
        assert.lengthOf(response, nTemplates)
    })

    it('FAIL: Template does not exist', async()=>{
        await rejects( async()=>{
            await TemplateController.findTemplateById(DatabaseManager.generateObjectId())
        })
    })
    
})

describe('Update Template', ()=>{

    it('PASS: Update by the creator', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const response = await TemplateController.createTemplateFromProject(creator._id, templateData)
        delete templateData.projectId
        const expectedMethodResponse = new Template({
            ...templateData,
            baseProject: response.baseProject,
            creationDate: response.creationDate,
            _id: response._id
        })
        mainTemplateId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored on update', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        templateData.extraField = "FOO"
        const response = await TemplateController.createTemplateFromProject(creator._id, templateData)
        assert.exists(response)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        delete templateData.name
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        templateData.name = 5
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

    it('FAIL: Creator User does not exist', async()=>{
        const creatorId = DatabaseManager.generateObjectId()
        const templateData = TestUtils.createTemplateObject(project._id, creatorId)
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creatorId, templateData)
        })
    })

    it('FAIL: Based Project does not exist', async()=>{
        const templateData = TestUtils.createTemplateObject(DatabaseManager.generateObjectId(), creator._id)
        await rejects( async()=>{
            await TemplateController.createTemplateFromProject(creator._id, templateData)
        })
    })

})


describe('Delete Template', ()=>{

    it('PASS: Template deleted by the Creator', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const template = await TemplateController.createTemplateFromProject(creator._id, templateData)
        await TemplateController.deleteTemplate(creator._id, template._id)
        assert.ok('Deleted')
    })

    it('FAIL: Template cannot be deleted by a different User of the creator', async()=>{
        const templateData = TestUtils.createTemplateObject(project._id, creator._id)
        const template = await TemplateController.createTemplateFromProject(creator._id, templateData)
        rejects( async()=>{
            await TemplateController.deleteTemplate(DatabaseManager.generateObjectId(), template._id)
        })
    })

    it('FAIL: Template does not exist', async()=>{
        await rejects( async()=>{
            await TemplateController.deleteTemplate(user1._id, project._id, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: Wrong templateId format should be rejected', async()=>{
        await rejects( async()=>{
            await TemplateController.deleteTemplate(user1._id, project._id, DatabaseManager.generateObjectId() + 'a')
        })
    })

    it('FAIL: Wrong projectId format should be rejected', async()=>{
        await rejects( async()=>{
            await TemplateController.deleteTemplate(user1._id, DatabaseManager.generateObjectId() + "A", mainTemplateId)
        })
    })

    it('FAIL: Wrong userId format should be rejected', async()=>{
        await rejects( async()=>{
            await TemplateController.deleteTemplate(DatabaseManager.generateObjectId() + "A", project._id, mainTemplateId)
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(Template.COLLECTION, Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
})

//*/