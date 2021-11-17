import express, { NextFunction, Request, Response } from 'express';
import { CustomComponentTemplateController } from '../controllers/CustomComponentTemplateController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "customcomponents"

router.get(`/${ENTITY_ROUTE}/:templateId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Custom Component Templates'] 
        #swagger.description = 'Find a Custom Component Template by Id'
        #swagger.responses[200] = {description: 'Searched Custom Component Template'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CustomComponentTemplateController.findCustomComponentTemplateById(requesterUserId, templateId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Custom Component Templates'] 
        #swagger.description = 'Find all Custom Component Templates in a Project'
        #swagger.responses[200] = {description: 'Collaborators list of the Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const projectId: string = req.query.project + ''
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CustomComponentTemplateController.findCustomComponentTemplatesByProject(requesterUserId, projectId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/:templateId/elements/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Custom Component Templates'] 
        #swagger.description = 'Find the Elemenets which belong to a specific Custom Component Template'
        #swagger.responses[200] = {description: 'Elements list'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CustomComponentTemplateController.findByCustomComponentsInstancesByTemplate(requesterUserId, templateId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Custom Component Templates'] 
        #swagger.description = 'Add a new Custom Component Template'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Custom Component Template data.',
            required: true,
            schema: { $ref: "#/definitions/CustomComponentTemplateCreate" }
        }
        #swagger.responses[200] = {description: 'New Custom Component Template data'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await CustomComponentTemplateController.createCustomComponentTemplate(requesterUserId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    try{
        /*  #swagger.tags = ['Custom Component Templates'] 
            #swagger.description = 'Update a Custom Component Template'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Custom Component Template data.',
                required: true,
                schema: { $ref: "#/definitions/CustomComponentTemplateUpdate" }
            }
            #swagger.responses[200] = {description: 'Success message'}
            #swagger.responses[400] = {description: 'Bad request'}
        */
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await CustomComponentTemplateController.updateCustomComponentTemplateFromExternalRequest(requesterUserId, req.body)
        res.status(200).send('CustomComponentTemplate updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:templateId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Custom Component Templates'] 
        #swagger.description = 'Delete a Custom Component Template'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await CustomComponentTemplateController.deleteCustomComponentTemplate(requesterUserId, templateId)
        res.status(200).send('CustomComponentTemplate deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router

