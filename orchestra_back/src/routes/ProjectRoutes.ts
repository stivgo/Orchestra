import express, { NextFunction, Request, Response } from 'express'
import { ProjectController } from '../controllers/ProjectController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "projects"

router.get(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Find all Project in which user is Collaborator'
        #swagger.responses[200] = {description: 'Projects list'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ProjectController.findProjectsByUser(requesterUserId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/:projectId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Find a Project by its id'
        #swagger.responses[200] = {description: 'Searched Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ProjectController.findProjectById(requesterUserId, projectId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/:projectId/export`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Returns the whole information of a project into a single JSON object'
        #swagger.responses[200] = {description: 'JSON object of the Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        let response = await ProjectController.exportProject(requesterUserId, projectId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Creates a Project in a Project and enroll its creator as an admin Collaborator.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Project information',
            required: true,
            schema: { $ref: "#/definitions/ProjectUpdate" }
        }
        #swagger.responses[200] = {description: 'Created Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ProjectController.createEmptyProject(requesterUserId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Update a Project'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await ProjectController.updateProjectFromExternalRequest(requesterUserId, req.body)
        res.status(200).send('Project updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:projectId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Projects'] 
        #swagger.description = 'Delete a Project and its content (sections, pages, elements, etc)'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await ProjectController.deleteProject(requesterUserId, projectId)
        res.status(200).send('Project deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router