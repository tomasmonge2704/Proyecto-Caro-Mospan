import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
// Establecer los valores de configuración
const CLIENT_ID = '475388183627-8s0qiu7nglrpv5qkg877njn8jar4gpqa.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//044eHopoyHtWJCgYIARAAGAQSNwF-L9IrtyHkQwVnJ70UfcweBXZ2nxz8c3hIZA6UuozieuCqsK38RMJLME8q6VFddRnvmy-03TE';

// Crear un objeto OAuth2Client y establecer el token de actualización
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Crear un objeto de la API de Google Drive
const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client,
});

export {drive}
