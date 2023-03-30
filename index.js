import express from 'express'
import {} from 'dotenv/config'
import cors from 'cors'
import {login,crearUsuario, listarAll,deleteUser,updateUser} from './mongoLogin.js';
import config from './config.js';
import exphbs from 'express-handlebars'
import path from 'path';
import { readFiles,combinarDatos} from "./utils.js";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
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
app.use(cors());
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('signup')
})
app.get('/api_links/:folderId', (req, res) => {
        readFiles(req.params.folderId).then(function (result) {
            if(result == undefined){
                res.send("error")
            }
            else{
                combinarDatos(result).then(function (result) {
                    res.send(result)
                })
            }
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
app.post('/login2', (req, res) => {
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
                listarAll().then(function(result){
                    res.render("home", {result})
                })
            }
            
        }else{
            res.render('loginFailed')
        }
    });

})
app.put('/user/:username/:password', (req, res) => {
updateUser(req.params.username,req.params.password).then( function (result) {
    res.send(result)
})
})
app.delete('/user/:username', (req, res) => {
    deleteUser(req.params.username).then( function (result) {
        res.send(result)
    })
    })
app.post('/register', (req, res) => {
    crearUsuario(req.body.username,req.body.password,req.body.token).then( function (result) {
        res.send(result)
    })
})

app.listen(config.PORT, () => {
    console.log(`Server on Port: ${config.PORT}`)
  })