import express, { NextFunction, Request, Response } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "authentication"

router.post(`/${ENTITY_ROUTE}/login`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Authentication']
        #swagger.description = 'Log in for a User'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User email and password.',
            required: true,
            schema: { $ref: "#/definitions/Login" }
        }
        #swagger.responses[200] = {description: 'UserId and JWT Token' }}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const response = await AuthenticationController.login(req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/logout`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Authentication']
        #swagger.description = 'Log out for a User'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */    
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await AuthenticationController.logout( requesterUserId + '' )
        res.status(200).send('Successful logout [TODO]')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router