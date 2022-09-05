const {google} = require('googleapis');
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com'
const CLIENT_secret = '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'
const redirect_url = 'https://developers.google.com/oauthplayground'
const refresh_token = '1//04L_suzuEL33UCgYIARAAGAQSNwF-L9IronqoEuTOy_gRow_TEw8GDt2px80JPyr0RAaKEY0TRL0lvC6x8ojTA-pFPDzcjQjZXbw'
const express = require('express')
const cors = require('cors')
const app = express()
const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_secret,
    redirect_url
)
oauth2client.setCredentials({refresh_token: refresh_token})

const drive = google.drive({
    version:'v3',
    auth: oauth2client
})


async function generatePublicURl(fileID){
    try{
        await drive.permissions.create({
            fileId: fileID,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileID,
            fields:'webViewLink, webContentLink'
        })
        return result.data.webViewLink
    }
    catch(error){
        console.log(error)
    }
}
async function combinarDatos(array){
 var newArray = array.map(async e => {
    e.links = await generatePublicURl(e.id)  
    return e
})

return Promise.all(newArray).then(function(results){
    return results
})
}
async function readFiles(folderId){
   
    try{
        const result = await drive.files.list({
            q: `'${folderId}' in parents`
        })
        return result.data.files
        
    }
    catch(error){
        console.log(error)
    }
}

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.get('/api_links/:folderId', (req, res) => {
    readFiles(req.params.folderId).then(function(result){
        combinarDatos(result).then(function(result){
            res.send(result)
        })
    })
   
  })
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port 8080`)
  })