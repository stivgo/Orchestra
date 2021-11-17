import express, { NextFunction, Request, Response } from 'express'
import { SectionController } from '../controllers/SectionController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "projects/:projectId/sections"

router.get(`/${ENTITY_ROUTE}/:sectionId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Sections'] 
        #swagger.description = 'Find a Section by its id in a Project'
        #swagger.responses[200] = {description: 'Searched Section'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {sectionId, projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await SectionController.findSectionById(requesterUserId, projectId, sectionId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Sections'] 
        #swagger.description = 'Creates a Section in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Section information',
            required: true,
            schema: { $ref: "#/definitions/SectionCreate" }
        }
        #swagger.responses[200] = {description: 'Created Section'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await SectionController.createEmptySection(requesterUserId, projectId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Sections'] 
        #swagger.description = 'Update a Section in a Project'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated Section information',
            required: true,
            schema: { $ref: "#/definitions/SectionUpdate" }
        }
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await SectionController.updateSectionFromExternalRequest(requesterUserId, projectId, req.body)
        res.status(200).send('Section updated')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:sectionId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Sections'] 
        #swagger.description = 'Delete a Section from a Project, also delete the Pages inside it'
        #swagger.responses[200] = {description: 'Success message'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {projectId, sectionId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        await SectionController.deleteSection(requesterUserId, projectId, sectionId)
        res.status(200).send('Section deleted')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router