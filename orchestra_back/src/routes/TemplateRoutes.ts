import express, { NextFunction, Request, Response } from 'express'
import { TemplateController } from '../controllers/TemplateController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "templates"

router.get(`/${ENTITY_ROUTE}/:templateId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Templates'] 
        #swagger.description = 'Find a Template by its id'
        #swagger.responses[200] = {description: 'Searched Template'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TemplateController.findTemplateById(templateId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Templates'] 
        #swagger.description = 'Find all available Templates for an User'
        #swagger.responses[200] = {description: 'Searched Template'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TemplateController.findAllTemplates()
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Templates'] 
        #swagger.description = 'Creates a Template from a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Template information',
            required: true,
            schema: { $ref: "#/definitions/TemplateCreate" }
        }
        #swagger.responses[200] = {description: 'Created Template'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TemplateController.createTemplateFromProject(requesterUserId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/:templateId/projects/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Templates'] 
        #swagger.description = 'Creates a Project from a Template'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Template information',
            required: true,
            schema: { $ref: "#/definitions/ProjectByTemplateCreate" }
        }
        #swagger.responses[200] = {description: 'Created Project'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TemplateController.createProjectFromTemplate(requesterUserId, templateId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:templateId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Templates'] 
        #swagger.description = 'Delete a Template'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {templateId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await TemplateController.deleteTemplate(requesterUserId, templateId)
        res.status(200).send('Template deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router