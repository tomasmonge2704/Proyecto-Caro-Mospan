const {google} = require('googleapis');
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com'
const CLIENT_secret = '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'
const redirect_url = 'https://developers.google.com/oauthplayground'
const refresh_token = '1//04kKRlLIVtK4hCgYIARAAGAQSNwF-L9IrmzEgJyIVzlMOD9Lko2qpRlNiT-rGTAdoWmZsgUXiYPbvOMGrCWXvjZO4VjIv1DfCLq4'

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
        console.log(result.data.webViewLink)
    }
    catch(error){
        console.log(error)
    }
}

async function readFiles(folderId){
    folderId = '1I2eCVi3QHyEm8ba2CyNiCJCv4itWW0XM'
    try{
        const result = await drive.files.list({
            q: `'${folderId}' in parents`
        })
        result.data.files.forEach(e => {
            console.log(e)
            generatePublicURl(e.id)
        });
        
    }
    catch(error){
        console.log(error)
    }
}

readFiles();