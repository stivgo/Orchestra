import express, { NextFunction, Request, Response } from 'express'
import { ElementController } from '../controllers/ElementController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "projects/:projectId/elements"

router.get(`/${ENTITY_ROUTE}/:elementId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Elements'] 
        #swagger.description = 'Find a Element by their Id'
        #swagger.responses[200] = {description: 'Searched Element'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, elementId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ElementController.findElementById(requesterUserId, projectId, elementId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Elements'] 
        #swagger.description = 'Find all Elements in a Page'
        #swagger.responses[200] = {description: 'Elements list of the Page, the children Elements are nested into their parents'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const page: string = req.query.page + ''
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ElementController.findElementsByPageId(requesterUserId, projectId, page)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Elements'] 
        #swagger.description = 'Create a new Element in a Page'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Element information according to the Element type',
            required: true,
            schema: { $ref: "#/definitions/ElementCreate" }
        }
        #swagger.responses[200] = {description: 'New Element data'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ElementController.createElement(requesterUserId, projectId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Elements'] 
        #swagger.description = 'Update a Element in a Page'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated Element information according to the Element type',
            required: true,
            schema: { $ref: "#/definitions/ElementUpdate" }
        }
        #swagger.responses[200] = {description: 'Updated Element Data'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await ElementController.updateElementFromExternalRequest(requesterUserId, projectId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:elementId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Elements'] 
        #swagger.description = 'Delete a Element from a Page'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, elementId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await ElementController.deleteElement(requesterUserId, projectId, elementId)
        res.status(200).send('Element deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router

