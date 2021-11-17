import express, { NextFunction, Request, Response } from 'express'
import { TimelineController } from '../controllers/TimelineController';
import { JwtManager } from '../utils/JwtManager';

const router = express.Router()

const ENTITY_ROUTE: string = "timelines/:timelineId"

router.get(`/${ENTITY_ROUTE}`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Timelines'] 
        #swagger.description = 'Find a Timeline by its id'
        #swagger.responses[200] = {description: 'Searched Timeline'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {timelineId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TimelineController.findById(timelineId)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Timelines'] 
        #swagger.description = 'Add a Element to a Timeline'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Element information',
            required: true,
            schema: { $ref: "#/definitions/TimelineElement" }
        }
        #swagger.responses[200] = {description: 'Updated Timeline'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {timelineId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TimelineController.addElement(requesterUserId, timelineId, req.body)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put(`/${ENTITY_ROUTE}/`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Timelines'] 
        #swagger.description = 'Update a Element of the Timeline'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Element information',
            required: true,
            schema: { $ref: "#/definitions/TimelineElement" }
        }
        #swagger.responses[200] = {description: 'Updated Timeline'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {timelineId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TimelineController.updateElement(requesterUserId, timelineId, req.body, true)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete(`/${ENTITY_ROUTE}/:elementId`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Timelines'] 
        #swagger.description = 'Delete a Element from the Timeline '
        #swagger.responses[200] = {description: 'Updated Timeline'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        const {timelineId, elementId} = req.params
        const requesterUserId = JwtManager.getUserDataFromTokenInRequest(req)
        const response = await TimelineController.deleteElement(timelineId, elementId, true)
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router