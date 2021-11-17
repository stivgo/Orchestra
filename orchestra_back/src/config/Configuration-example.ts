import { ConfigurationType } from "./ConfigurationType";

//-----------------------------------------------------------------------
// Global configuration
//-----------------------------------------------------------------------

const GlobalConfiguration = {
    JWT_SECRET_KEY: 'secret_key'  //REPLACE
}

//-----------------------------------------------------------------------
// Local configuration
//-----------------------------------------------------------------------

const LocalConfiguration: ConfigurationType = {
    ...GlobalConfiguration,
    DB_CONNECTION_STRING: 'mongodb://localhost/orchesta',
    PORT: 3000,
}

//-----------------------------------------------------------------------	
// Test configuration	
//-----------------------------------------------------------------------	

const TestConfiguration: ConfigurationType = {	
    ...GlobalConfiguration,	
    DB_CONNECTION_STRING: 'mongodb://localhost/orchesta-test',	
    PORT: 3000,	
}

//-----------------------------------------------------------------------
// Remote configuration
//-----------------------------------------------------------------------

const RemoteDbConfig = {
    name: 'orchesta-back',
    password: 'password',  //REPLACE
    database: 'orchesta'
}

const RemoteConfiguration: ConfigurationType = {
    ...GlobalConfiguration,
    DB_CONNECTION_STRING: "mongodb+srv://" + RemoteDbConfig.name + ":" + RemoteDbConfig.password + "@cluster0.ycedq.mongodb.net/" + RemoteDbConfig.database + "?retryWrites=true&w=majority",
    PORT: 3000,
}

//-----------------------------------------------------------------------
// Export configuration
//-----------------------------------------------------------------------

if ( process.env.NODE_ENV ){
    console.log( "started in mode:", process.env.NODE_ENV );	
}
else{
    console.log( "started by default in localmode" );
}

if ( process.env.NODE_ENV === 'development_local' ){	
    module.exports = LocalConfiguration	
}	
else if ( process.env.NODE_ENV === 'development_remote' ){	
    module.exports = RemoteConfiguration	
}
else if ( process.env.NODE_ENV === 'test_local' ){	
    module.exports = TestConfiguration
}
else{
    module.exports = LocalConfiguration
}