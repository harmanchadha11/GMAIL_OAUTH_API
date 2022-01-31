const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = '';
const REFRESH_TOKEN = '';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN});


async function sendMail(){
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                type:'OAuth2',
                user:'harmanchadha11@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions = {
            from: 'Support Team',// The sender name
            to : '', // Sender mail
            subject : "Test Mail",
            text :'Test Mail',
            html : '<h1>TestMail</h1>'
        }

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
        
    }
}
sendMail().then(result => console.log("Email Sent....",result))
.catch(error=>console.log(error));