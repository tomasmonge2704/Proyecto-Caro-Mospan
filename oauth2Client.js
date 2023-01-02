import { google } from 'googleapis';
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com'
const CLIENT_secret = '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'
const redirect_url = 'https://developers.google.com/oauthplayground'
const refresh_token = '1//0489jUJ9L3qXCCgYIARAAGAQSNwF-L9Ir-wtQr75vAzd_Zv4vx2lK2ukwTUGf4S8v4vFDSyW0-wUjmI1p1UpSsAOddQWTPggYLMU'

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_secret,
    redirect_url
)
oauth2client.setCredentials({ refresh_token:refresh_token})

export {oauth2client,google};