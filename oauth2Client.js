import { google } from "googleapis";
import { JWT } from "google-auth-library";

// Establecer los valores de configuración
const CLIENT_EMAIL = 'tomas-monge2704-gmail-com@proyecto-caro-mospan.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDeh9lKyKAP7bAC\nl82U4UfGrU8ZXmxscACP7M5UyruDoxhJw7upfzKx8WcwvSKFDOFJ2MQaCcX8NedO\n10O8btv/r336muvuPyr9Bc3ODbEkVGRvEr3lJvgSFcxqZfgN7FxynOLvsCrnvsG0\ndKnx9JIFeq2FIPao4f4dtit8WuuNnDkqdutqn1TOKo3UXz02sBNOSAMMXYDO1T90\nSQXpLuYfaTxjS9H354A8CH/Fr23FSxdPhn05aAF0vjJ++0pW0UD9e8qVBL9Ji/kO\n7kVi050Q5Yn0LLzcYadeTTpFbBGL9IBU5gN0XTM3I52yn8g2peGirZhonFjfZ/CD\nhhjYLWulAgMBAAECgf8/AK9tDIn7kAQtnaM2LViVSBjRN91/2zs91/oqVeLQvZ2d\njfRH9n83dE3AR/XuV3XkS05pFgzqxk2u95wjljo7B8rFEXraBjybGAG8UlMWJ7Rx\nf2dZA/X5Z4YiO4gw+z+Z0Dm+ZA/hCk1VL+bOTkOmCsnXLc77k9u0kwD7hTVFtaTO\nNIy+3Y/PgiKlQP7sa/DRugynMwi5Oe1BApOhTC73Ooaw1n04Z0RFWA1XdOrD4QUP\ngAFYgawqffdJsodOYCSLh3GZwQFlh1IoORfxJRtVcICv+WGraY3bRgi3SI/NfMmt\nxusUWUQClZkjGx30KfOHq4FTbYbYkRRkcdfhjbECgYEA+76/J+ih9ejHjQZkGcf7\nNJdY9HQ1u0c5z/ZBjaCPjMvyf4bEGsWxTJOKU1iCji1az7ZmndsDJC0PUADxcBxF\nbG9W5J66MmCDrnXHzooh0BEdn8X0dLR6R/RNwP8mduisgD1i1WXpBjlsBQNPh5TR\nSu9r9H25WpLmCQSCyzCrS00CgYEA4kqyXTduf91RdkJ/KZTgmVBGIK3ELXTPqzXP\nRG4d5i6CAuK9t+2AIcdr/DuWbNkQgNQperXJwEUxEVSE0wtGTqeYTjQWmdumI9jJ\nrJPg81mcvRPY9kR0qBivYWFVq7SWZP8QVZiFe1axFkM539TGCf7ycSZ7pLTprVN/\nUULZhbkCgYEA6erz9EFVPQpvYbruiIYqBVQcdAkHZF1qerJ3dwIaYNmhGp4+2iGX\n/W+auJcluLasCxWRhFxdLuAvukcmEOY0G+3Y79YNbYIA2brXTjNL9+nvfOaTn12T\nwghft1VeiF7q6r4fd+qZ/A6fMIlC/NhrIRYXWbb45BBbb0WhwuwWPoECgYA04KOB\nKLzHYB3y9mLkgodhC+L3K+OVg6ArL625HcoayW9T4UvXuMWiHwlarUnfMXGryOfQ\nZr44EXL/y7Il5pKNOphaXc2SMkNGSRgHHZ8I/j2j6QlfsmtYBDynEqmEL/ScsQVO\nGw/F3GIRA7B4Xy3PlCVuz0FBIY0hFUvA31AY8QKBgQDsnzawP7lG6WqtVGi+HEzo\n5svaoikwT4yjzKZwJOUqFtx3sdHM7QId755vf4ws/ZW8+ZDela17njjHQwmw7L1N\nLuxFB+59lqI+lkaqp2na9+ivIgGOmqA/7rus+SCCUhQvjyD6UsFWwhQUX5maTO1m\njBPecttzaJMCq7wC4E/Yeg==\n-----END PRIVATE KEY-----\n";

// Crear un objeto JWT y establecer las credenciales
const auth = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/drive'], // Asegúrate de incluir los permisos necesarios
});

// Crear un objeto de la API de Google Drive
const drive = google.drive({
  version: 'v3',
  auth: auth,
});

export { drive };
