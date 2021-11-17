// @ts-nocheck

const swaggerAutogen = require('swagger-autogen')()

//-----------------------------------------------------------------------
// Schemas definition
//-----------------------------------------------------------------------

const Login = {
    "email": "johngonzalez@javeriana.edu.co",
    "password": "miContrasena123"
}
const Collaborator = {
    "role": "Auxiliar",
    "permissions": ["Watch project"],
    "userId": "612fa93cc6c2d02e80dc9687"
}
const CustomComponentTemplateCreate = {
    "projectId": "612dac3c10a1b91448473466",
    "name": "Tarjeta De Presentación",
    "description": "Muestra la información básica de una persona",
    "defaultWidth": 20,
    "defaultHeight": 40,
    "childComponents": [
        {
            "type": "Button",
            "title": "Nombre",
            "description": "Botón con el nombre de la persona y que enlaza hacía la página de la persona descrita",
            "xPosition": 0.1,
            "yPosition": 0.1,
            "zPosition": 1,
            "width": 10,
            "height": 2,
            "startTime": 100,
            "endTime": 5500,
            "isSelected": true,
            "isActive": true,
            "isVisible": true,
            "events": [],
            "styles": [{
                "property": "display",
                "value": "flex"
            },{
                "property": "color",
                "value": "red"
            }],
            "isStatic": true,
            "urlSource": "",
            "content": "Emanuel Alvarez",
            "isLocked": false
        },
        {
            "type": "Image",
            "title": "Foto de Perfil",
            "description": "Imagen de la persona descrita en la tarjeta",
            "xPosition": 0.1,
            "yPosition": 3,
            "zPosition": 1,
            "width": 10,
            "height": 20,
            "startTime": 1500,
            "endTime": 6000,
            "isSelected": true,
            "isActive": true,
            "isVisible": false,
            "events": [],
            "styles": [{
                "property": "display",
                "value": "flex"
            },{
                "property": "color",
                "value": "red"
            }],
            "isStatic": true,
            "urlSource": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720",
            "alternativeText": "Imagen random",
            "isLocked": false
        },
        {
            "type": "Paragraph",
            "title": "Descripción de la Persona",
            "description": "Breve resumen de la información de la persona presentada en la Tarjeta",
            "xPosition": 0.5,
            "yPosition": 10,
            "zPosition": 1,
            "width": 20,
            "height": 20,
            "startTime": 1000,
            "endTime": 60000,
            "isSelected": true,
            "isActive": true,
            "isVisible": false,
            "events": [],
            "styles": [{
                "property": "display",
                "value": "flex"
            },{
                "property": "color",
                "value": "black"
            }],
            "isStatic": true,
            "urlSource": "",
            "content": "Emanuel Alvarez es un estudiante de Ingenieria de Sistemas",
            "isLocked": false
        }
    ]
}
const CustomComponentTemplateUpdate = {
    "_id": "61707b563a57271d28710f2c",
    ...CustomComponentTemplateCreate
}
const ElementCreate = {
    "pageId": "61311fbe2b8de30d98785db4",
    "type": "Layer",
    "title": "Capa Principal",
    "description": "Capa que contiene los datos principales de una pagina",
    "xPosition": 0,
    "yPosition": 0,
    "zPosition": 1,
    "width": 100,
    "height": 100,
    "startTime": 0,
    "endTime": 600000,
    "isSelected": true,
    "isActive": true,
    "isVisible": false,
    "events": [],
    "styles": [{
        "property": "display",
        "value": "flex"
    }],
    "isLocked": false
}
const ElementUpdate = {
    _id: "61707b563a57271d28710f2c",
    ...ElementCreate,
}
const OrganizationCreate = {
    "country": "Colombia",
    "facebookUrl": "www.facebook.com/TesosTV/",
    "name": "OrchestaOrgDevelopmentTest",
    "nit": "122233445677-2",
    "phoneNumber": "+57 3176653321",
    "twitterUrl": "www.twitter.com/TesosTV/",
    "website": "https://github.com/TesosTV/"
}
const OrganizationUpdate = {
    _id: "61707b563a57271d28710f2c",
    ...OrganizationCreate,
}
const PageCreate = {
    "name": "Página Introductoria",
    "description": "Página con la información de presentación del proyecto",
    "number": 1,
    "startTime": 0,
    "endTime": 100000
}
const PageUpdate = {
    _id: "61707b563a57271d28710f2c",
    ...PageCreate,
}
const ProjectCreate = {
    "name": "Primer Proyecto HbbTV",
    "description": "Primera aplicación HbbTV de prueba",
    "organizationId": "612da1c0bcc07c40945b2ccc"
}
const ProjectUpdate = {
    _id: "61707b563a57271d28710f2c",
    version: 2,
    ...ProjectCreate,
}
const SectionCreate = {
    "name": "Primera Sección del Programa",
    "number": 1,
    "startTime": 20,
    "endTime": 700000
}
const SectionUpdate = {
    _id: "61707b563a57271d28710f2c",
    ...SectionCreate,
}
const UserCreate = {
    "firstName": "Stiven",
    "lastName": "Gonzalez",
    "email": "stivenGonzalez@javeriana.edu.co",
    "password": "miContrasena123"
}
const UserUpdate = {
    "_id": "612d8efe7f21fa339c89ce5f",
    "firstName": "Stiven",
    "lastName": "Gonzalez O"
}
const CreateTemplate = {
    "creator": "612d8efe7f21fa339c89ce5f",
    "projectId": "612dac3c10a1b91448473466",
    "name": "Plantilla Proyecto 1",
    "description": "Copia del proyecto 1 para ser reutilizado"
}
const ProjectByTemplateCreate = {
    "organizationId": "612da1c0bcc07c40945b2ccc",
    "description": "Proyecto generado a través de una plantilla",
    "name": "Copia Proyecto"
}
const TimelineElement = {
    "_id": "612da1c0bcc07c40945b2ccc", 
    "startTime": 100,
    "endTime": 10000,
    "name": "Elemento Ejemplo"
}
//-----------------------------------------------------------------------
// Doc definition
//-----------------------------------------------------------------------

const doc = {
    info: {
        version: "1.0.0",
        title: "Orchestra API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Authentication",
            description: "Use to login and logout"
        },
        {
            name: "Collaborators",
            description: "Use to manage the users who has access to a project and their permissions"
        },
        {
            name: "Custom Component Templates",
            description: "Use to manage the Custom Component Templates which will define new Components created by an user in a project"
        },
        {
            name: "Elements",
            description: "Use to manage the Elements in a Project"
        },
        {
            name: "Organizations",
            description: "Use to manage the Organizations and their members"
        },
        {
            name: "Pages",
            description: "Use to manage the Pages in a Section"
        },
        {
            name: "Projects",
            description: "Use to manage the Projects of an User"
        },
        {
            name: "Resources",
            description: "Use to get the resources which are used in the FrontEnd"
        },
        {
            name: "Sections",
            description: "Use to manage the Sections of a Project"
        },
        {
            name: "Users",
            description: "Use to manage the Users of the editor"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "token",
            in: "header",
            name: "Authorization", 
            description: "The authorization is managed by a JWT Token provided on User login"
        }
    },
    definitions: {
        Login,
        Collaborator,
        CustomComponentTemplateCreate,
        CustomComponentTemplateUpdate,
        ElementCreate,
        ElementUpdate,
        OrganizationCreate,
        OrganizationUpdate,
        PageCreate,
        PageUpdate,
        ProjectCreate,
        ProjectUpdate,
        SectionCreate,
        SectionUpdate,
        UserCreate,
        UserUpdate,
        CreateTemplate,
        ProjectByTemplateCreate,
        TimelineElement
    }
}

const outputFile = __dirname + '/swagger_output.json'
const endpointsFiles = [__dirname + '/routes/*']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')           // Your project's root file
})