import {oauth2client,google} from "./oauth2Client.js";

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})

export async function generatePublicURl(fileID) {
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
export async function combinarDatos(array) {
    var newArray = array.map(async e => {
        e.links = await generatePublicURl(e.id)
        return e
    })

    return Promise.all(newArray).then(function (results) {
        return results
    })
}
export async function readFiles(folderId) {

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