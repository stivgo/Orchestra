//@ts-nocheck
import { assert } from 'chai';
import {rejects} from 'assert'
import { AuthenticationController } from '../src/controllers/AuthenticationController';
import { UserController } from '../src/controllers/UserController';
import { User } from '../src/models/users/User';
import { JwtManager } from '../src/utils/JwtManager';
import { TestUtils } from './TestUtils';

//-----------------------------------------------------------------------
// FISRT TEST EXECUTED
//-----------------------------------------------------------------------

let user: User
let mainToken: string

before( async()=>{
    await TestUtils.connectDatabase()
    user = await UserController.createUser({
        email: "JoHnDoE@gmail.com",
        password: "myPassword",
        firstName: "John",
        lastName: "Doe"
    })
})

describe('Login User', ()=>{
    
    it('PASS: Login', async()=>{
        const response = await AuthenticationController.login({
            email: user.email, 
            password: "myPassword"
        })
        const expectedMethodResponse = {
            userId: user._id!,
            token: response.token
        }
        mainToken = expectedMethodResponse.token
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Email is wrong formatted', async()=>{
        const response = await AuthenticationController.login({
            email: "JOHNDOE@gmail.COM", 
            password: "myPassword"
        })
        const expectedMethodResponse = {
            userId: user._id!,
            token: response.token
        }
        assert.deepEqual(response, expectedMethodResponse)
    })

    it('PASS: Valid token', async()=>{
        const loginResult = await AuthenticationController.login({
            email: user.email, 
            password: "myPassword"})
        let receivedUserId = JwtManager.getDataFromToken("Bearer " + loginResult.token).userId
        assert.equal(receivedUserId, user._id!)
    })

    it('FAIL: Incorrect password', async()=>{
        await rejects(async() => {
            await AuthenticationController.login({
                email: user.email, 
                password: "myPasswordWrong"
            })
        })
    })

    it('FAIL: Incorrect email', async()=>{
        await rejects(async() => {
            await AuthenticationController.login({
                email: user.email + "incorrect", 
                password: "myPassword"
            })
        })
    })

    it('FAIL: Email is not present', async()=>{
        await rejects(async() => {
            await AuthenticationController.login({
                password: "myPassword"
            })
        })
    })

    it('FAIL: Password is not present', async()=>{
        await rejects(async() => {
            await AuthenticationController.login({
                email: user.email
            })
        })
    })

})

describe('Logout User', ()=>{
    
    it('PASS: Successful logout', async()=>{
        await AuthenticationController.logout('Bearer ' + mainToken)
        assert.ok('logout')
    })

    it('FAIL: User has not logged in', async()=>{
        await rejects( async()=>{
            await AuthenticationController.logout(mainToken+"a")
        })
    })
})

after( async()=>{
    await TestUtils.clearCollection(User.COLLECTION)
})