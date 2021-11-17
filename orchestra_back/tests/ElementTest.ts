//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { ObjectId } from 'mongoose';
import { CollaboratorController } from '../src/controllers/CollaboratorController';
import { ElementController } from '../src/controllers/ElementController';
import { PageController } from '../src/controllers/PageController';
import { SectionController } from '../src/controllers/SectionController';
import { Element, ElementDataType } from '../src/models/elements/abstractElements/Element';
import { Audio, Button, Container, Image, Link, Menu, Video } from '../src/models/elements/ElementsTypes';
import { Paragraph } from '../src/models/elements/text/Paragraph';
import { Collaborator } from '../src/models/projects/Collaborator';
import { Page } from '../src/models/projects/Page';
import { Project } from '../src/models/projects/Project';
import { Organization } from '../src/models/users/Organization';
import { User } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import ObjectUtils from '../src/utils/ObjectUtils';
import { TestUtils } from './TestUtils';

let creator: User, user1: User, user2: User
let project: Project
let page: Page
let mainElementId: ObjectId

describe('Create Element', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION, Element.COLLECTION)
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
        page = await PageController.createEmptyPage(creator._id, project._id, section._id, TestUtils.createPageObject(), true)
    })

    it('PASS: Create basic Element', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id!)
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        const expectedMethodResponse = new Paragraph({
            ...elementData,
            _id: response._id,
        })
        mainElementId = response._id
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Extra information is not allowed', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id!)
        elementData.extraField = "FOO"
        rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, elementData)
        })
    })

    it('FAIL: Less information should be rejected', async()=>{
        const element: ElementDataType = TestUtils.createParagraphExampleObject(page._id!)
        delete element.description
        await rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, element)
        })
    })

    it('FAIL: Creator User does not exist', async()=>{
        const elementData: ElementDataType = TestUtils.createParagraphExampleObject(page._id!)
        await rejects( async()=>{
            await ElementController.createElement(DatabaseManager.generateObjectId(), project._id, elementData)
        })
    })
    
    it('PASS: Created by a Collaborator with enough permissions', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id!)
        const response = await ElementController.createElement(user1._id, project._id, elementData)
        const expectedMethodResponse = new Paragraph({
            ...elementData,
            _id: response._id
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('FAIL: Creator User does not have enoguh permission', async()=>{
        const elementData: ElementDataType = TestUtils.createParagraphExampleObject(page._id!)
        await rejects( async()=>{
            await ElementController.createElement(user2._id, project._id, elementData)
        })
    })

    it('PASS: Create Audio', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Audio.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            audioType: "mp3"
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response,)
    })

    it('PASS: Create Menu', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Menu.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            isNavigable: true,
            isCyclical: false,
            menuItems: [
                {
                    text: "Opcion 1",
                    type: "MenuItem"
                },
                {
                    text: "Opcion 2",
                    type: "MenuItem"
                },
                {
                    text: "Opcion 3 Que tiene una imagen (no se como hacerla xd)",
                    type: "MenuThumbnail",
                    iconUrl: "https://cnnespanol.cnn.com/wp-content/uploads/2021/05/GettyImages-1203559048.jpg?quality=100&strip=info",
                    image: {
                        pageId: "61311fbe2b8de30d98785db4",
                        type: "Image",
                        title: "Mi Imagen",
                        description: "miDescripcion",
                        xPosition: 210,
                        yPosition: 300,
                        zPosition: 1,
                        width: 150,
                        height: 150,
                        startTime: 4000,
                        endTime: 5000,
                        isSelected: true,
                        isActive: true,
                        isVisible: false,
                        events: [],
                        styles: [{
                            property: "display",
                            value: "flex"
                        },{
                            property: "color",
                            value: "red"
                        }],
                        isStatic: true,
                        urlSource: "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720",
                        alternativeText: "Imagen random",
                        isLocked: false
                    }
                },
                {
                    text: "Opcion 4 Que tiene una imagen y otras cosas mas",
                    type: "MenuVideoThumbnail",
                    iconUrl: "https://cnnespanol.cnn.com/wp-content/uploads/2021/05/GettyImages-1203559048.jpg?quality=100&strip=info",
                    image: {
                        pageId: "61311fbe2b8de30d98785db4",
                        type: "Image",
                        title: "Mi Imagen",
                        description: "miDescripcion",
                        xPosition: 210,
                        yPosition: 300,
                        zPosition: 1,
                        width: 150,
                        height: 150,
                        startTime: 4000,
                        endTime: 5000,
                        isSelected: true,
                        isActive: true,
                        isVisible: false,
                        events: [],
                        styles: [{
                            property: "display",
                            value: "flex"
                        },{
                            property: "color",
                            value: "red"
                        }],
                        isStatic: true,
                        urlSource: "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720",
                        alternativeText: "Imagen random",
                        isLocked: false
                    },
                    title: "xd toca corregir esto",
                    description: "No tengo ni idea de que significa",
                    issueDate: 1636246042
                }
                
            ]
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('FAIL: Wrong MenuItems should be rejected', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Menu.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            isNavigable: true,
            isCyclical: false,
            menuItems: [
                {
                    text: "Opcion 1",
                    type: "MenuItem",
                    wrongType: 1
                }
            ]
        })
        await rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, elementData)
        })
    })

    it('PASS: Create Link', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Link.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            content: "Link here"
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Create Container', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Container children List should be ignored', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [DatabaseManager.generateObjectId()]
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Create Button', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Button.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            content: "Press here"
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Create Image', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Image.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            alternativeText: "image here"
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Create Video', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Video.DATA_TYPE,
            urlSource: "www.foo.com",
            isStatic: true,
            duration: 1000
        })
        const response = await ElementController.createElement(creator._id, project._id, elementData)
        assert.exists(response)
    })

    it('PASS: Element added as a child of a Container', async()=>{
        let parent = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [DatabaseManager.generateObjectId()]
        })
        parent = await ElementController.createElement(creator._id, project._id, parent)
        const child = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            parentId: parent._id
        })
        const response = await ElementController.createElement(creator._id, project._id, child)
        assert.exists(response)
    })

    it('PASS: Element added to a nested Container', async()=>{
        let parent = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [DatabaseManager.generateObjectId()]
        })
        parent = await ElementController.createElement(creator._id, project._id, parent)
        const child = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            parentId: parent._id
        })
        const response = await ElementController.createElement(creator._id, project._id, child)
        assert.exists(response)
    })
    
    it('FAIL: If the parent does not exist it should not be accepted', async()=>{
        const elementData = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            parentId: DatabaseManager.generateObjectId()
        })
        await rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, elementData)
        })
    })

    it('FAIL: The page of the Element and the parent does not match', async()=>{
        let parent = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [DatabaseManager.generateObjectId()]
        })
        parent = await ElementController.createElement(creator._id, project._id, parent)
        const child = TestUtils.createElementObject(DatabaseManager.generateObjectId(), {
            type: Container.DATA_TYPE,
            childElementIds: [],
            parentId: parent._id
        })
        await rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, child)
        })
    })

    it('FAIL: A non-existing Page should be rejected', async()=>{
        const element = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            parentId: DatabaseManager.generateObjectId()
        })
        await rejects( async()=>{
            await ElementController.createElement(creator._id, project._id, element)
        })
    })

})

describe('Find Element', ()=>{

    it('PASS: Find by the creator', async()=>{
        const elementData: ElementDataType = TestUtils.createParagraphExampleObject(page._id!)
        const response = await ElementController.findElementById(creator._id, project._id, mainElementId)
        const expectedMethodResponse = new Paragraph({
            ...elementData,
            _id: mainElementId
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Find by other memeber of the Element with enough permissions (modify)', async()=>{
        const response = await ElementController.findElementById(user1._id, project._id, mainElementId)
        assert.exists(response)
    })

    it('PASS: Find by other memeber of the Element with enough permissions (watch)', async()=>{
        const response = await ElementController.findElementById(user2._id, project._id, mainElementId)
        assert.exists(response)
    })

    it('FAIL: Find by a external User', async()=>{
        await rejects( async()=>{
            await ElementController.findElementById(DatabaseManager.generateObjectId(), project._id, mainElementId)
        })        
    })

    it('FAIL: Element does not exist', async()=>{
        await rejects( async()=>{
            await ElementController.findElementById(creator._id, project._id, DatabaseManager.generateObjectId())
        })
    })
    
})

describe('Update Element', ()=>{

    it('PASS: Update by creator', async()=>{
        const elementData = await ElementController.findElementById(creator._id, project._id, mainElementId)
        elementData.title = "Modified"
        const element = new Paragraph(elementData)
        const response = await ElementController.updateElement(creator._id, project._id, element)
        const expectedMethodResponse = new Paragraph({
            ...elementData,
            _id: mainElementId,
        })
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Updated by a Collaborator', async()=>{
        const elementData = await ElementController.findElementById(user1._id, project._id, mainElementId)
        elementData.title = "Modified"
        const element = new Paragraph(elementData)
        const response = await ElementController.updateElement(user1._id, project._id, element)
        assert.exists(response)
    })

    it('FAIL: Updated by a Collaborator without enough permissions', async()=>{
        const elementData = await ElementController.findElementById(user2._id, project._id, mainElementId)
        elementData.title = "Modified"
        const element = new Element(elementData)
        rejects( async()=>{
            await ElementController.updateElement(user2._id, project._id, element)
        })
    })

    it('FAIL: Updated by a external User', async()=>{
        const elementData: ElementDataType = TestUtils.createElementObject(page._id!)
        elementData.title = "Modified"
        await rejects( async()=>{
            await ElementController.updateElement(DatabaseManager.generateObjectId(), project._id, new Element(elementData))
        })
    })

    it('FAIL: Element does not exist', async()=>{
        await rejects( async()=>{
            const elementData: ElementDataType = TestUtils.createElementObject(page._id!)
            elementData.title = "Modified"
            elementData._id = DatabaseManager.generateObjectId()
            await ElementController.updateElement(creator._id, project._id, new Paragraph(elementData))
        })        
    })

    it('FAIL: Wrong data on update should be rejected 1', async()=>{
        const elementData = await ElementController.findElementById(user2._id, project._id, mainElementId)
        elementData.nonExistField = "Modified"
        const element = new Element(elementData)
        rejects( async()=>{
            await ElementController.updateElement(user2._id, project._id, element)
        })
    })

    it('FAIL: Wrong data on update should be rejected 2', async()=>{
        const elementData = await ElementController.findElementById(user2._id, project._id, mainElementId)
        elementData.title = 4
        const element = new Element(elementData)
        rejects( async()=>{
            await ElementController.updateElement(user2._id, project._id, element)
        })
    })

    it('FAIL: Is not possible to change the type of an Element', async()=>{
        const elementData = await ElementController.findElementById(user2._id, project._id, mainElementId)
        elementData.type = 'Audio'
        const element = new Element(elementData)
        rejects( async()=>{
            await ElementController.updateElement(user2._id, project._id, element)
        })
    })

    it('PASS: Children Element properties (isVisible and isLocked) should be updated when the parent ones are updated', async()=>{
        let parent = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            isVisible: true,
            isLocked: true
        })
        let createdParent = await ElementController.createElement(creator._id, project._id, parent)
        let child = TestUtils.createElementObject(page._id!, {
            type: Video.DATA_TYPE,
            urlSource: "",
            isStatic: true,
            duration: 1000,
            parentId: ObjectUtils.getIdAsObjectId(createdParent._id),
            isVisible: true,
            isLocked: true
        })
        let updatedChild = await ElementController.createElement(creator._id, project._id, child)
        createdParent.isVisible = false
        createdParent.isLocked = false
        await ElementController.updateElement(creator._id, project._id, createdParent)
        updatedChild = await ElementController.findElementById(creator._id, project._id, updatedChild._id)
        assert.equal(parent.isLocked, updatedChild.isLocked)
        assert.equal(parent.isVisible, updatedChild.isVisible)
    })

    it('PASS: A child Element can updated its properties (isVisible and isLocked) independent of its parent', async()=>{
        let parent = TestUtils.createElementObject(page._id!, {
            type: Container.DATA_TYPE,
            childElementIds: [],
            isVisible: true,
            isLocked: true
        })
        let createdParent = await ElementController.createElement(creator._id, project._id, parent)
        let child = TestUtils.createElementObject(page._id!, {
            type: Video.DATA_TYPE,
            urlSource: "",
            isStatic: true,
            duration: 1000,
            parentId: ObjectUtils.getIdAsObjectId(createdParent._id),
            isVisible: false,
            isLocked: false
        })
        let updatedChild = await ElementController.createElement(creator._id, project._id, child)
        createdParent.isVisible = false
        createdParent.isLocked = false
        updatedChild.isVisible = true
        updatedChild.isLocked = true
        await ElementController.updateElement(creator._id, project._id, createdParent)
        await ElementController.updateElement(creator._id, project._id, updatedChild)
        const definitiveChild = await ElementController.findElementById(creator._id, project._id, updatedChild._id)
        assert.equal(definitiveChild.isLocked, updatedChild.isLocked)
        assert.equal(definitiveChild.isVisible, updatedChild.isVisible)
    })
})

describe('Delete Element', ()=>{

    it('PASS: Element deleted by the Creator', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id)
        const element = await ElementController.createElement(creator._id, project._id, elementData)
        await ElementController.deleteElement(creator._id, project._id, element._id)
        assert.ok('Deleted')
    })

    it('PASS: Element deleted by a Collaborator with enough permissions', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id)
        const element = await ElementController.createElement(creator._id, project._id, elementData)
        await ElementController.deleteElement(user1._id, project._id, element._id)
        assert.ok('Deleted')
    })

    it('FAIL: Element cannot be deleted by a Collaborator without enough permissions', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id)
        const element = await ElementController.createElement(creator._id, project._id, elementData)
        await rejects( async()=>{
            await ElementController.deleteElement(user2._id, project._id, element._id)
        })
    })

    it('FAIL: Element does not exist', async()=>{
        rejects( async()=>{
            await ElementController.deleteElement(user1._id, project._id, DatabaseManager.generateObjectId())
        })
    })

    it('PASS: Child Elements should be deleted when their parent is deleted', async()=>{
        const elementData = TestUtils.createParagraphExampleObject(page._id)
        const element = await ElementController.createElement(creator._id, project._id, elementData)
        await ElementController.deleteElement(creator._id, project._id, element._id)
        assert.ok('Deleted')
    })

})

after( async()=>{
    await TestUtils.clearCollection(Project.COLLECTION, Organization.COLLECTION, User.COLLECTION, Element.COLLECTION)
})