//@ts-nocheck
import { rejects } from 'assert';
import { assert } from 'chai';
import { UserController } from '../src/controllers/UserController';
import { User, UserDataType } from '../src/models/users/User';
import { DatabaseManager } from '../src/utils/DatabaseManager';
import { TestUtils } from './TestUtils';

describe('Create User', ()=>{

    before( async()=>{
        await TestUtils.clearCollection(User.COLLECTION)
    })
    
    it('PASS: Password hiden', async()=>{
        const userData = TestUtils.createUserObject()
        const response = await UserController.createUser(userData)
        const expectedMethodResponse = new User({
            _id: response._id,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        })    
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Database Object password registered', async ()=>{
        const userData = TestUtils.createUserObject({email: "johndoe_2@gmail.com"})
        const createdUser = await UserController.createUser(userData)
        const databaseObject: any = await DatabaseManager.findDocumentById(User.COLLECTION, createdUser._id!)
        assert.typeOf(databaseObject.password, 'string')
    })

    it('FAIL: Extra information should be rejected', async ()=>{
        const wrongUserData = TestUtils.createUserObject({email: "johnDOE_3@gmail.com", extraField: 10})
        await rejects(async() => {
            await UserController.createUser(wrongUserData)
        })  
    })

    it('FAIL: Wrong datatype information should be rejected', async ()=>{
        const wrongUserData = TestUtils.createUserObject({email: "johnDOE_3@gmail.com", firstName: 10})
        await rejects(async() => {
            await UserController.createUser(wrongUserData)
        })  
    })

    it('FAIL: Less information should be rejected', async ()=>{
        const wrongUserData = TestUtils.createUserObject({email: "johndoe_4@gmail.com"})
        delete wrongUserData.password
        await rejects(async() => {
            await UserController.createUser(wrongUserData)
        })  
    })

    it('FAIL: Duplicated email on creation', async ()=>{
        const duplicatedUser = TestUtils.createUserObject()
        await rejects(async() => {
            await UserController.createUser(duplicatedUser)
        })  
    })

    after(async()=>{
        await TestUtils.clearCollection(User.COLLECTION)
    })
       
})

describe('Update User', async()=>{

    let toUpdateUser: User
    before( async()=>{
        toUpdateUser = TestUtils.createUserObject({email: "johndoe_update@gmail.com"})
        toUpdateUser = await UserController.createUser(toUpdateUser)
    })

    it( 'PASS: basic update', async()=>{
        let updatedUser = new User({
            _id: toUpdateUser._id,
            firstName: "John2",
            lastName: "Doe2",
            email: "johndoe2@gmail.com"
        })
        let response = await UserController.updateUser(updatedUser)
        assert.deepEqual(updatedUser, response)
    })

    it( 'PASS: Password ignored', async()=>{
        let updatedUser = new User({
            _id: toUpdateUser._id,
            firstName: "John_updated",
            lastName: "Doe_updated",
            email: "johndoe_updated@gmail.com",
            password: "changedPassword"
        })
        let response = await UserController.updateUser(updatedUser)
        let {password} = await DatabaseManager.findDocumentById(User.COLLECTION, response._id!)
        assert.notEqual(updatedUser.password, password)
    })

    it( 'FAIL: Extra information should be rejected', async()=>{
        let updatedUser = new User({
            _id: toUpdateUser._id,
            firstName: "John_updated",
            lastName: "Doe_updated",
            email: "johndoe_updated@gmail.com",
            aditionalField: "fail"
        } as UserDataType)
        await rejects(async() => {
            await UserController.updateUser(updatedUser)
        })
    })

    it( 'FAIL: Wrong datatype information should be rejected', async()=>{
        let updatedUser = new User({
            _id: toUpdateUser._id,
            firstName: "John_updated",
            lastName: 10,
            email: "johndoe_updated@gmail.com",
            aditionalField: "fail"
        } as UserDataType)
        await rejects(async() => {
            await UserController.updateUser(updatedUser)
        })
    })

    it( 'FAIL: Less information should be rejected', async()=>{
        let updatedUser = new User({
            _id: toUpdateUser._id,
            firstName: "John_updated",
            email: "johndoe_updated@gmail.com"
        } as unknown as UserDataType)
        await rejects(async() => {
            await UserController.updateUser(updatedUser)
        })
    })

    after(async()=>{
        await TestUtils.clearCollection(User.COLLECTION)
    })
    
})

describe('Find User', async()=>{

    let toFindUser: User
    before( async()=>{
        toFindUser = TestUtils.createUserObject({email: "johndoe@gmail.com"})
        toFindUser = await UserController.createUser(toFindUser)
    })

    it( 'PASS: Find by id', async()=>{
        const searchedUserId = toFindUser._id!
        const response = await UserController.findUserById(searchedUserId)
        const expectedResponse = new User({
            _id: searchedUserId,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        })
        assert.deepEqual(response, expectedResponse)
    })

    it( 'FAIL: User does not exists', async()=>{
        const searchedUserId = DatabaseManager.generateObjectId()
        await rejects(async() => {
            await UserController.findUserById(searchedUserId)
        })
    })

    it( 'PASS: Find by email', async()=>{
        const searchedUserEmail = toFindUser.email
        const response = await UserController.findUserByEmail(searchedUserEmail)
        const expectedResponse = new User({
            _id: toFindUser._id!,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        })
        assert.deepEqual(response, expectedResponse)
    })

    it( 'FAIL: Email does not exist', async()=>{
        const searchedUserEmail = "johndoedoesnotexist@gmail.com"
        await rejects(async() => {
            await UserController.findUserByEmail(searchedUserEmail)
        })
    })

    it( 'PASS: Find by email and password', async()=>{
        const searchedUserEmail = toFindUser.email
        const password = "myPassword"
        const response = await UserController.findUserByEmailAndPassword(searchedUserEmail, password)
        const expectedResponse = new User({
            _id: toFindUser._id!,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        })
        assert.deepEqual(response, expectedResponse)
    })

    it( 'FAIL: Find by email and password, email does not exist', async()=>{
        const searchedUserEmail = "johndoedoesnotexist@gmail.com"
        const password = toFindUser.password!
        await rejects(async() => {
            await UserController.findUserByEmailAndPassword(searchedUserEmail, password)
        })
    })

    it( 'FAIL: Find by email and password, incorrect password', async()=>{
        const searchedUserEmail = toFindUser.email
        const password = "incorrectPassword"
        await rejects(async() => {
            await UserController.findUserByEmailAndPassword(searchedUserEmail, password)
        })
    })

    after(async()=>{
        await TestUtils.clearCollection(User.COLLECTION)
    })
    
})

describe('Delete User', async()=>{

    let toDeleteUser: User
    before( async()=>{
        toDeleteUser = TestUtils.createUserObject()
        toDeleteUser = await UserController.createUser(toDeleteUser)
    })

    it( 'PASS: Basic delete', async()=>{
        let toDeleteId = toDeleteUser._id!
        await UserController.deleteUser(toDeleteId)
        assert.ok('Deleted')
    })

    it( 'FAIL: Find deleted User', async()=>{
        let deletedId = toDeleteUser._id!
        await rejects(async() => {
            await UserController.findUserById(deletedId)
        })
    })

    it( 'FAIL: Delete a User that does not exist', async()=>{
        let deletedId = toDeleteUser._id!
        await rejects(async() => {
            await UserController.deleteUser(deletedId)
        })
    })

    it( 'FAIL: Wrong format UserId should fail', async()=>{
        let deletedId = toDeleteUser._id + "a"
        await rejects(async() => {
            await UserController.deleteUser(deletedId)
        })
    })

    it( 'FAIL: Undefined UserId should fail', async()=>{
        let deletedId = toDeleteUser._id + "a"
        await rejects(async() => {
            await UserController.deleteUser(undefined)
        })
    })

    after(async()=>{
        await TestUtils.clearCollection(User.COLLECTION)
    })
    
})

//-----------------------------------------------------------------------
// LAST TEST EXECUTED
//-----------------------------------------------------------------------

after( async()=>{
    await TestUtils.disconnectDatabase()
})