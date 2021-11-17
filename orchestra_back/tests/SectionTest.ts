//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { SectionController } from '../src/controllers/SectionController';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Project } from '../src/models/projects/Project';
import { Section, SectionDataType } from '../src/models/projects/Section';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

let creator: User, user1: User, user2: User
let project: Project
let mainSectionId: ObjectId

describe('Create Section', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
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

    it('PASS: Create empty Section', async()=>{
        const sectionData = TestUtils.createSectionObject()
        const response = await SectionController.createEmptySection(creator._id, project._id, sectionData)
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: response._id,
        })
        mainSectionId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Extra information should be ignored', async()=>{
        const sectionData = TestUtils.createSectionObject()
        const response = await SectionController.createEmptySection(creator._id, project._id, {...sectionData, extraField: "FOO"})
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Pages array in input data should be ignored', async()=>{
        const sectionData = TestUtils.createSectionObject()
        const response = await SectionController.createEmptySection(creator._id, project._id, {...sectionData, pages: ['FOO']})
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Less information should be rejected', async()=>{
        const section: SectionDataType = TestUtils.createSectionObject()
        delete section.name
        await rejects( async()=>{
            await SectionController.createEmptySection(creator._id!, project._id, section)
        })
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const section: SectionDataType = TestUtils.createSectionObject()
        section.name = 10
        await rejects( async()=>{
            await SectionController.createEmptySection(creator._id!, project._id, section)
        })
    })

    it('FAIL: If the Project does not exist the request should be rejected', async()=>{
        const section: SectionDataType = TestUtils.createSectionObject()
        await rejects( async()=>{
            await SectionController.createEmptySection(creator._id!, DatabaseManager.generateObjectId(), section)
        })
    })
    
    it('FAIL: Creator User does not exist', async()=>{
        const section: SectionDataType = TestUtils.createSectionObject()
        await rejects( async()=>{
            await SectionController.createEmptySection(DatabaseManager.generateObjectId(), project._id, section)
        })
    })
    
    it('PASS: Created by a Collaborator with enough permissions', async()=>{
        const sectionData = TestUtils.createSectionObject()
        const response = await SectionController.createEmptySection(user1._id, project._id, {...sectionData, extraField: "FOO"})
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Creator User does not have enoguh permission', async()=>{
        const section: SectionDataType = TestUtils.createSectionObject()
        await rejects( async()=>{
            await SectionController.createEmptySection(user2._id, project._id, section)
        })
    })
})

describe('Find Section', ()=>{

    it('PASS: Find by the creator', async()=>{
        const sectionData: SectionDataType = TestUtils.createSectionObject()
        const response = await SectionController.findSectionById(creator._id, project._id, mainSectionId)
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: mainSectionId
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the Section with enough permissions (modify)', async()=>{
        const response = await SectionController.findSectionById(user1._id, project._id, mainSectionId)
        assert.exists(response)
    })

    it('PASS: Find by other memeber of the Section with enough permissions (watch)', async()=>{
        const response = await SectionController.findSectionById(user2._id, project._id, mainSectionId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await SectionController.findSectionById(DatabaseManager.generateObjectId(), project._id, mainSectionId)
        })        
    })

    it('FAIL: Section does not exist', async()=>{
        await rejects( async()=>{
            await SectionController.findSectionById(creator._id, project._id, DatabaseManager.generateObjectId())
        })
    })
    
})

describe('Update Section', ()=>{

    it('PASS: Update by creator', async()=>{
        const sectionData = await SectionController.findSectionById(creator._id, project._id, mainSectionId)
        sectionData.name = "Modified"
        const section = new Section(sectionData)
        const response = await SectionController.updateSection(creator._id, project._id, section)
        const expectedMethodResponse = new Section({
            ...sectionData,
            _id: mainSectionId,
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const sectionData = await SectionController.findSectionById(user1._id, project._id, mainSectionId)
        sectionData.name = "Modified"
        const section = new Section(sectionData)
        const response = await SectionController.updateSection(user1._id, project._id, section)
        assert.exists(response)
    })

    it('FAIL: Updated by a Collaborator without enough permissions', async()=>{
        const sectionData = await SectionController.findSectionById(user2._id, project._id, mainSectionId)
        sectionData.name = "Modified"
        const section = new Section(sectionData)
        rejects( async()=>{
            await SectionController.updateSection(user2._id, project._id, section)
        })
    })

    it('FAIL: Wrong datatype information should be rejected', async()=>{
        const sectionData = await SectionController.findSectionById(creator._id, project._id, mainSectionId)
        sectionData.name = 50
        const section = new Section(sectionData)
        rejects( async()=>{
            await SectionController.updateSection(creator._id, project._id, section)
        })
    })

    it('FAIL: Wrong pages array should be rejected', async()=>{
        const sectionData = await SectionController.findSectionById(creator._id, project._id, mainSectionId)
        sectionData.pages = ["FO"]
        const section = new Section(sectionData)
        rejects( async()=>{
            await SectionController.updateSection(creator._id, project._id, section)
        })
    })

    it('FAIL: Updated by a external User', async()=>{
        const sectionData: SectionDataType = TestUtils.createSectionObject()
        await rejects( async()=>{
            await SectionController.updateSection(DatabaseManager.generateObjectId(), project._id, new Section(sectionData))
        })
    })

    it('FAIL: Section does not exist', async()=>{
        await rejects( async()=>{
            const sectionData: SectionDataType = TestUtils.createSectionObject()
            sectionData._id = DatabaseManager.generateObjectId()
            await SectionController.updateSection(creator._id, project._id, new Section(sectionData))
        })        
    })
})

describe('Delete Section', ()=>{

    it('PASS: Section deleted by the Creator', async()=>{
        const section = await SectionController.createEmptySection(creator._id, project._id, TestUtils.createSectionObject())
        await SectionController.deleteSection(creator._id, project._id, section._id)
        assert.ok('Deleted')
    })

    it('PASS: Section deleted by a Collaborator with enough permissions', async()=>{
        const section = await SectionController.createEmptySection(creator._id, project._id, TestUtils.createSectionObject())
        await SectionController.deleteSection(user1._id, project._id, section._id)
        assert.ok('Deleted')
    })

    it('FAIL: Section cannot be deleted by a Collaborator without enough permissions', async()=>{
        const section = await SectionController.createEmptySection(creator._id, project._id, TestUtils.createSectionObject())
        await rejects( async()=>{
            await SectionController.deleteSection(user2._id, project._id, section._id)
        })
    })

    it('FAIL: Section does not exist', async()=>{
        rejects( async()=>{
            await SectionController.deleteSection(user1._id, project._id, DatabaseManager.generateObjectId())
        })
    })

    it('FAIL: Wrong searched id sgould fail', async()=>{
        rejects( async()=>{
            await SectionController.deleteSection(user1._id, project._id, mainSectionId + "A")
        })
    })

    it('FAIL: Project does not exist', async()=>{
        rejects( async()=>{
            await SectionController.deleteSection(user1._id, DatabaseManager.generateObjectId(), mainSectionId)
        })
    })

    it('FAIL: Requester user does not exist', async()=>{
        rejects( async()=>{
            await SectionController.deleteSection(DatabaseManager.generateObjectId(), project._id, mainSectionId)
        })
    })

})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION)
})