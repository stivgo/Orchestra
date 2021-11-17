import express, { NextFunction, Request, Response } from 'express'
import { CollaboratorController } from '../controllers/CollaboratorController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "projects/:projectId/collaborators"

router.get(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Collaborators'] 
        #swagger.description = 'Find all Collaborators in a Project'
        #swagger.responses[200] = {description: 'Collaborators list of the Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CollaboratorController.getCollaborators(requesterUserId, projectId, true)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/:userId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Collaborators'] 
        #swagger.description = 'Find a Collaborator by the UserId in a Project'
        #swagger.responses[200] = {description: 'Searched Collaborator'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, userId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CollaboratorController.findCollaboratorById(requesterUserId, projectId, userId, true)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Collaborators'] 
        #swagger.description = 'Add a new User as Collaborator in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User information and their role in the Project.',
            required: true,
            schema: { $ref: "#/definitions/Collaborator" }
        }
        #swagger.responses[200] = {description: 'New Collaborator data'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CollaboratorController.addCollaborator( requesterUserId, projectId, req.body )
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Collaborators'] 
        #swagger.description = 'Update a Collaborator in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated Collaborator',
            required: true,
            schema: { $ref: "#/definitions/Collaborator" }
        }
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await CollaboratorController.updateCollaboratorFromExternalRequest(requesterUserId, projectId, req.body)
        res.status(200).send('Collaborator updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:userId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Collaborators'] 
        #swagger.description = 'Delete a Collaborator from a Project'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, userId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await CollaboratorController.deleteCollaborator(requesterUserId, projectId, userId)
        res.status(200).send('Collaborator deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router