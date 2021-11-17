import express, { NextFunction, Request, Response } from 'express'
import { OrganizationController } from '../controllers/OrganizationController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "organizations"

router.get(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Find all Organizations which the logged in User belongs to'
        #swagger.responses[200] = {description: 'Organizations list of the User'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await OrganizationController.findOrganizationsByUser(requesterUserId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/:organizationId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Find a Organization by their Id'
        #swagger.responses[200] = {description: 'Searched Organization'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {organizationId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await OrganizationController.findOrganizationById(requesterUserId, organizationId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Create a new Organization and enroll its creator'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Organization information',
            required: true,
            schema: { $ref: "#/definitions/OrganizationCreate" }
        }
        #swagger.responses[200] = {description: 'New Organization data'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await OrganizationController.createEmptyOrganization(requesterUserId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/:organizationId/users/:usermail`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Add an User as member of the Organization by its email'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {usermail, organizationId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await OrganizationController.addUserByMail(requesterUserId , organizationId, usermail)
        res.status(200).send('User added to the Organization')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Update a Organization in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated Organization',
            required: true,
            schema: { $ref: "#/definitions/OrganizationUpdate" }
        }
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await OrganizationController.updateOrganizationFromExternalRequest(requesterUserId, req.body)
        res.status(200).send('Organization updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:organizationId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Delete a Organization from a Project'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {organizationId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await OrganizationController.deleteOrganization(requesterUserId, organizationId)
        res.status(200).send('Organization deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:organizationId/users/:userId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Organizations'] 
        #swagger.description = 'Removes an User from an Organization'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {userId, organizationId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await OrganizationController.removeUser(requesterUserId , organizationId, userId)
        res.status(200).send('User removed from the Organization')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router