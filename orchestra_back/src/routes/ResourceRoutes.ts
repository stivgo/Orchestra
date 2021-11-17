import express, { NextFunction, Request, Response } from 'express'
import { ResourceController } from '../controllers/ResourceController'

const router = express.Router()

const ENTITY_ROUTE: string = "resources"

router.get(`/${ENTITY_ROUTE}/styles`, async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.tags = ['Resources'] 
        #swagger.description = 'Return all css styles that can be used in a element'
        #swagger.responses[200] = {description: 'Styles string list'}
        #swagger.responses[400] = {description: 'Bad request'}
    */
    try{
        let response = await ResourceController.getStyles()
        res.status(200).send(response)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router