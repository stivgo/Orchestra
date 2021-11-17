import express from 'express'
import { ConfigurationType } from './config/ConfigurationType'
import { DatabaseManager } from './utils/DatabaseManager'

const routes = require('./routes/AllRoutes')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//Load all models types before starting
require('./LoadDataTypes')

//-----------------------------------------------------------------------
// Environment configuration
//-----------------------------------------------------------------------

const ServerConfig: ConfigurationType = require('./config/Configuration')
const app = express()

//-----------------------------------------------------------------------
// Middlewares
//-----------------------------------------------------------------------

app.use( express.json() )
app.use( cors() )

//Error middleware
app.use((err: any, req: any, res: any, next: any) => {
    if (err) {
        console.log("\n\tMiddleware error: ", err.message);
        res.status(500).send("Internal error : " + err.message )
    } else {
        next()
    }
})

//-----------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------

app.use( routes )
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//-----------------------------------------------------------------------
// Server start
//-----------------------------------------------------------------------

const server = app.listen( ServerConfig.PORT, ()=>{
    console.log('Server started on port ' + ServerConfig.PORT)
} )

//-----------------------------------------------------------------------
// Database
//-----------------------------------------------------------------------

const connectDatabase = async function(){
    try{
        await DatabaseManager.connect(ServerConfig.DB_CONNECTION_STRING)
    }
    catch(error){
        console.log( error );
    }
}

connectDatabase()
module.exports = server