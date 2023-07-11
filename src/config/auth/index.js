const { google } = require("googleapis");

require("dotenv").config();

// Criação do cliente OAuth2
const oAuth2Client = new google.auth.OAuth2({
  clientId: process.env.FIREBASE_CLIENT_ID,
  clientSecret: process.env.FIREBASE_CLIENT_SECRET,
  redirectUri: process.env.FIREBASE_REDIRECT_URI,
});

// Gere a URL de autorização
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
});

module.exports = {
  oAuth2Client,
  authUrl,
};
