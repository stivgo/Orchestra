import express, { NextFunction, Request, Response } from 'express'
import { UserController } from '../controllers/UserController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "users"

router.get(`/${ENTITY_ROUTE}/:userId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Users'] 
        #swagger.description = 'Find a User by its id'
        #swagger.responses[200] = {description: 'Searched User, without password'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {userId} = req.params
        const response = await UserController.findUserById(userId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Users'] 
        #swagger.description = 'Creates a User'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: { $ref: "#/definitions/UserCreate" }
        }
        #swagger.responses[200] = {description: 'Created User, without password'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const response = await UserController.createUser(req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Users'] 
        #swagger.description = 'Update a User in a Project, it not allows to update the password or the email by this endpoint'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated User information',
            required: true,
            schema: { $ref: "#/definitions/UserUpdate" }
        }
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await UserController.updateUserFromExternalRequest(requesterUserId, req.body)
        res.status(200).send('User updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:userId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Users'] 
        #swagger.description = 'Delete a User, also delete all other resources related to the user'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {userId} = req.params
        await UserController.deleteUser(userId)
        res.status(200).send('User deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router