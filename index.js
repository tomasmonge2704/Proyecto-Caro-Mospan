import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
import { google } from 'googleapis';
import express from 'express'
import cors from 'cors'
import {login,crearUsuario} from './mongoLogin.js';
import os from 'os'
import cluster from 'cluster'
import config from './config.js';
import exphbs from 'express-handlebars'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const numCPUs = os.cpus().length;
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com'
const CLIENT_secret = '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'
const redirect_url = 'https://developers.google.com/oauthplayground'
const refresh_token = '1//04x6I77ufGf5dCgYIARAAGAQSNwF-L9IrCwFKIbDOUmE5_V8WwtPuWLx5r2DFa2JBUsvZl8HgTSlRhWSXqT5H0X2GW-jUgYVfRTM'
const app = express()
const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
app.use(express.static('views'))
app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: null,
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views"
}))
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_secret,
    redirect_url
)
oauth2client.setCredentials({ refresh_token: refresh_token })

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})


async function generatePublicURl(fileID) {
    try {
        await drive.permissions.create({
            fileId: fileID,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileID,
            fields: 'webViewLink, webContentLink'
        })
        return result.data.webViewLink
    }
    catch (error) {
        console.log(error)
    }
}
async function combinarDatos(array) {
    var newArray = array.map(async e => {
        e.links = await generatePublicURl(e.id)
        return e
    })

    return Promise.all(newArray).then(function (results) {
        return results
    })
}
async function readFiles(folderId) {

    try {
        const result = await drive.files.list({
            q: `'${folderId}' in parents`
        })
        return result.data.files

    }
    catch (error) {
        console.log(error)
    }
}

app.use(cors());
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('signup')
})
app.get('/api_links/:folderId', (req, res) => {
    readFiles(req.params.folderId).then(function (result) {
        combinarDatos(result).then(function (result) {
            res.send(result)
        })
    })
})
app.post('/login', (req, res) => {
    login(req.body.username, req.body.password).then(function (result) {
        if (result == true) {
            if(req.body.folderId){
                readFiles(req.body.folderId).then(function (result) {
                    combinarDatos(result).then(function (result) {
                        res.send(result)
                    })
                }), function (reason) {
                    console.log(reason)
                }
            }else{
                res.send("login exitoso")
            }
            
        }else{
            res.send('login failed')
        }
    });

})
app.post('/register', (req, res) => {
    crearUsuario(req.body.username,req.body.password,req.body.token).then( function (result) {
        res.send(result)
    })
})

if (cluster.isMaster && config.CLUSTER == "on" ){
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

}else{
    const connectedServer = httpServer.listen(config.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${config.PORT} - PID WORKER ${process.pid}`)
    })
    connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))
}