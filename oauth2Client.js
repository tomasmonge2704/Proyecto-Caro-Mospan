import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
// Establecer los valores de configuración
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Crear un objeto OAuth2Client y establecer el token de actualización
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Crear un objeto de la API de Google Drive
const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client,
});

export {drive}