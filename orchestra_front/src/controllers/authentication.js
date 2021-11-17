import axios from 'axios';


//const server = 'http://localhost:3000/authentication/login';
const server = 'http://localhost:3000/authentication/login';
//configurar en el axios para incluir el localhost

//vuex para revisar los estados globales


const idprojectUser = "612dac3c10a1b91448473466";

const userTest = {
    email: "johngonzalez@javeriana.edu.co",
    password: "miContrasena123",


    anotherEmail: "juangonzalez@javeriana.edu.co",

    oneMoreEmail: "stivengonzalez@javeriana.edu.co"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTJkOGVmZTdmMjFmYTMzOWM4OWNlNWYiLCJpYXQiOjE2MzA4ODU4MTAsImV4cCI6MTYzOTUyNTgxMH0.yRyFNbN9MLDzjP3aFZZlUFhn7veeWvZ5gQuX1y29RxE";
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTJkOGVmZTdmMjFmYTMzOWM4OWNlNWYiLCJpYXQiOjE2MzA5NjIyNjgsImV4cCI6MTYzOTYwMjI2OH0.VSLfF670BLBqdCjqfbeKBMi7KleNJunUSl8Ag2DIZTQ"
const headers = {
    headers: {
        authorization: 'Bearer ' + token
    }
}

const pruebapost = async function(){
    //const data = await axios.post(server, userTest, headers);
    
    let data;
    try{
        data = await axios.post(server, userTest);
    }catch(e){
        console.log("error", e);
    }
    

    /*try{
        data = await axios.get(server + "/" + idprojectUser, headers);
    }catch(e){
        console.log("error", e);
    }

    const bodyRequest = {
        version: 5,

    }
    try{
        const project = data.data;
        project.version = 8;
        console.log()
        data = await axios.put(server, project, headers);
    }catch(e){
        console.log("error", e.request);
    }*/

    return data;
}


export {pruebapost}