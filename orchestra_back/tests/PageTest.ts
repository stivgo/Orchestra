//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { PageController } from '../src/controllers/PageController';
import { SectionController } from '../src/controllers/SectionController';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Page } from '../src/models/projects/Page';
import { Project } from '../src/models/projects/Project';
import { Section } from '../src/models/projects/Section';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, user1: User, user2: User
let project: Project
let mainPageId: ObjectId
let section: Section

describe('Create Page', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
        const initEnvironment = await TestUtils.createInitialEnvironment(2)
        creator = initEnvironment.creator
        user1 = initEnvironment.users[0]
        user2 = initEnvironment.users[1]
        project = initEnvironment.project
        section = await SectionController.createEmptySection(creator._id, project._id, TestUtils.createSectionObject())
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

    it('PASS: Create empty Page', async()=>{
        const pageData = TestUtils.createPageObject()
        const response = await PageController.createEmptyPage(creator._id, project._id, section._id, pageData, true)
        const expectedMethodResponse = new Page({
            ...pageData,
            _id: response._id,
        })
        mainPageId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored', async()=>{
        const pageData = TestUtils.createPageObject()
        const response = await PageController.createEmptyPage(creator._id, project._id, section._id, {...pageData, extraField: "FOO"}, true)
        const expectedMethodResponse = new Page({
            ...pageData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const page: PageDataType = TestUtils.createPageObject()
        delete page.name
        await rejects( async()=>{
            await PageController.createEmptyPage(creator._id!, project._id, section._id, page, false)
        })
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const page: PageDataType = TestUtils.createPageObject()
        page.name = 50
        await rejects( async()=>{
            await PageController.createEmptyPage(creator._id!, project._id, section._id, page, false)
        })
    })

    it('FAIL: Creator User does not exist', async()=>{
        const page: PageDataType = TestUtils.createPageObject()
        await rejects( async()=>{
            await PageController.createEmptyPage(DatabaseManager.generateObjectId(), project._id, section._id, page, false)
        })
    })
    
    it('PASS: Created by a Collaborator with enough permissions', async()=>{
        const pageData = TestUtils.createPageObject()
        const response = await PageController.createEmptyPage(user1._id, project._id, section._id, {...pageData, extraField: "FOO"}, true)
        const expectedMethodResponse = new Page({
            ...pageData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Creator User does not have enoguh permission', async()=>{
        const page: PageDataType = TestUtils.createPageObject()
        await rejects( async()=>{
            await PageController.createEmptyPage(user2._id, project._id, section._id, page, false)
        })
    })
})

describe('Find Page', ()=>{

    it('PASS: Find by the creator', async()=>{
        const pageData: PageDataType = TestUtils.createPageObject()
        const response = await PageController.findPageByIdAndSection(creator._id, project._id, section._id, mainPageId)
        const expectedMethodResponse = new Page({
            ...pageData,
            _id: mainPageId
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the Page with enough permissions (modify)', async()=>{
        const response = await PageController.findPageByIdAndSection(user1._id, project._id, section._id, mainPageId)
        assert.exists(response)
    })

    it('PASS: Find by other memeber of the Page with enough permissions (watch)', async()=>{
        const response = await PageController.findPageByIdAndSection(user2._id, project._id, section._id, mainPageId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await PageController.findPageByIdAndSection(DatabaseManager.generateObjectId(), project._id, section._id, mainPageId)
        })        
    })

    it('FAIL: Page does not exist', async()=>{
        await rejects( async()=>{
            await PageController.findPageByIdAndSection(creator._id, project._id, section._id, DatabaseManager.generateObjectId())
        })
    })
    
})

describe('Update Page', ()=>{

    it('PASS: Update by creator', async()=>{
        const pageData = await PageController.findPageByIdAndSection(creator._id, project._id, section._id, mainPageId)
        pageData.name = "Modified"
        const page = new Page(pageData)
        const response = await PageController.updatePage(creator._id, project._id, section._id, page)
        const expectedMethodResponse = new Page({
            ...pageData,
            _id: mainPageId,
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const pageData = await PageController.findPageByIdAndSection(user1._id, project._id, section._id, mainPageId)
        pageData.name = "Modified"
        const page = new Page(pageData)
        const response = await PageController.updatePage(user1._id, project._id, section._id, page)
        assert.exists(response)
    })

    it('FAIL: Updated by a Collaborator without enough permissions', async()=>{
        const pageData = await PageController.findPageByIdAndSection(user2._id, project._id, section._id, mainPageId)
        pageData.name = "Modified"
        const page = new Page(pageData)
        rejects( async()=>{
            await PageController.updatePage(user2._id, project._id, section._id, page)
        })
    })

    it('FAIL: Updated by a external User', async()=>{
        const pageData: PageDataType = TestUtils.createPageObject()
        await rejects( async()=>{
            await PageController.updatePage(DatabaseManager.generateObjectId(), project._id, new Page(pageData))
        })
    })

    it('FAIL: Page does not exist', async()=>{
        await rejects( async()=>{
            const pageData: PageDataType = TestUtils.createPageObject()
            pageData._id = DatabaseManager.generateObjectId()
            await PageController.updatePage(creator._id, project._id, section._id, new Page(pageData))
        })        
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const pageData = await PageController.findPageById(creator._id, project._id, mainPageId)
        pageData.name = 30
        await rejects( async()=>{
            await PageController.updatePage(creator._id, project._id, new Page(pageData))
        })
    })

    it('FAIL: Lees information should be rejected', async()=>{
        const pageData = await PageController.findPageById(creator._id, project._id, mainPageId)
        delete pageData.name
        await rejects( async()=>{
            await PageController.updatePage(creator._id, project._id, new Page(pageData))
        })
    })

    it('FAIL: Wrong formatted id should be rejected', async()=>{
        const pageData = await PageController.findPageById(creator._id, project._id, mainPageId)
        pageData._id += "A"
        await rejects( async()=>{
            await PageController.updatePage(creator._id, project._id, new Page(pageData))
        })
    })

    it('FAIL: Undefined id should be rejected', async()=>{
        const pageData = await PageController.findPageById(creator._id, project._id, mainPageId)
        delete pageData._id
        await rejects( async()=>{
            await PageController.updatePage(creator._id, project._id, new Page(pageData))
        })
    })
})

describe('Delete Page', ()=>{

    it('PASS: Page deleted by the Creator', async()=>{
        const page = await PageController.createEmptyPage(creator._id, project._id, section._id, TestUtils.createPageObject(), false)
        await PageController.deletePage(creator._id, project._id, section._id, page._id)
        assert.ok('Deleted')
    })

    it('PASS: Page deleted by a Collaborator with enough permissions', async()=>{
        const page = await PageController.createEmptyPage(creator._id, project._id, section._id, TestUtils.createPageObject(), false)
        await PageController.deletePage(user1._id, project._id, section._id, page._id)
        assert.ok('Deleted')
    })

    it('FAIL: Page cannot be deleted by a Collaborator without enough permissions', async()=>{
        const page = await PageController.createEmptyPage(creator._id, project._id, section._id, TestUtils.createPageObject(), false)
        await rejects( async()=>{
            await PageController.deletePage(user2._id, project._id, section._id, page._id)
        })
    })

    it('FAIL: Page does not exist', async()=>{
        rejects( async()=>{
            await PageController.deletePage(user1._id, project._id, section._id, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: PageId is bad formatted', async()=>{
        rejects( async()=>{
            await PageController.deletePage(user1._id, project._id, section._id, mainPageId + "A")
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
})