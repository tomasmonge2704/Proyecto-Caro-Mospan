import { google } from 'googleapis';
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com'
const CLIENT_secret = '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'
const redirect_url = 'https://developers.google.com/oauthplayground'
const refresh_token = '1//04i_l0fUsLQcFCgYIARAAGAQSNwF-L9IrVMocunR4mvmAFSsQHfiItuqqmibSFX_rtuUg1v7dVq_cE4OY8pb1PcMHFTD8BDseAIs'

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_secret,
    redirect_url
)
oauth2client.setCredentials({ refresh_token:refresh_token})

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})

export {oauth2client,google,drive};