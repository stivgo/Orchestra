import express, { NextFunction, Request, Response } from 'express';
import { PageController } from '../controllers/PageController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "projects/:projectId/sections/:sectionId/pages"

router.get(`/${ENTITY_ROUTE}/:pageId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Pages'] 
        #swagger.description = 'Find a Page by its id into a Section and a Project'
        #swagger.responses[200] = {description: 'Searched Page'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {pageId, projectId, sectionId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await PageController.findPageByIdAndSection(requesterUserId, projectId, sectionId, pageId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Pages'] 
        #swagger.description = 'Creates a Page in a Project and a Section. The new Page is created with a default Container and a Layer'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Page information',
            required: true,
            schema: { $ref: "#/definitions/PageCreate" }
        }
        #swagger.responses[200] = {description: 'Created Page'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, sectionId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await PageController.createEmptyPage(requesterUserId, projectId, sectionId, req.body, true)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Pages'] 
        #swagger.description = 'Update a Page in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated Page information',
            required: true,
            schema: { $ref: "#/definitions/PageUpdate" }
        }
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, sectionId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await PageController.updatePageFromExternalRequest(requesterUserId, projectId, sectionId, req.body)
        res.status(200).send('Page updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:pageId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Pages'] 
        #swagger.description = 'Delete a Page from a Project and the Section, also deletes all Elements that belong to the Page'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, sectionId, pageId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await PageController.deletePage(requesterUserId, projectId, sectionId, pageId)
        res.status(200).send('Page deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router