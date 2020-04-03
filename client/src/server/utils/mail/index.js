// const mailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { welcome } = require("./welcome_template");
const { verification } = require("./account_verification");
const { resetpassword } = require("./reset_password");
require('dotenv').config();

const getEmailData = (user, token, type) => {
    let data = null;
    let URL = null;

    // URL = 'https://www.lumisoft.co.id/';

    if (process.env.SERVERENV === 'production') {
        URL = process.env.DOMAINADDRESS;
    } else {
        URL = process.env.LOCALADDRESS;
    }

    switch (type) {
        case "resetpassword":
            data = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: `Reset password for ${user.name} (${user.email})`,
                html: resetpassword(token.token, user, URL)
            }
            break;
        case "verification":
            data = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: `Account Verification for ${user.name}`,
                html: verification(token.token, user, URL)
            }
            break;
        case "welcome":
            data = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: `Welcome to Lumisoft ${user.name}`,
                html: welcome()
            }
            break;
        default:
            data;
    }


    return data;
}

const sendEmail = (user, token, type) => {
    ///////////////////////////////////////////////////////////////
    /////////////////////// NODE MAILER ///////////////////////////
    ///////////////////////////////////////////////////////////////
    // const smtpTransport = mailer.createTransport({
    //     service: "gmail",
    //     host: 'smtp.gmail.com',
    //     auth: {
    //         type: 'OAuth2',
    //         user: process.env.EMAIL_UN,
    //         // pass: process.env.EMAIL_PASS,
    //         clientId: process.env.EMAILCLIENTID,
    //         clientSecret: process.env.EMAILCLIENTSECRET,
    //         refreshToken: process.env.EMAILREFRESHTOKEN,
    //         accessToken: process.env.EMAILACCESSTOKEN,
    //         expires: '1563008423947'
    //     }
    // });

    // const mail = getEmailData(user, token, type)
    // // console.log(mail, "<!_+!_+!_+!_+!_+!_+!_+!_+!_+ mail mail mail")
    // smtpTransport.sendMail(mail, function (err, response) {
    //     if (err) {
    //         console.log(err, "email not sent");
    //     } else {
    //         console.log(response, "email sent")
    //     }
    //     smtpTransport.close();
    // })
    ////////////////////////////////////////////////////////////////
    
    const mail = getEmailData(user, token, type)
    //ES6
    // sgMail.send(mail).then(() => {
    //     console.log(response, "email sent")
    // }, console.error);
    //ES8
    (async () => {
        try {
            await sgMail.send(mail);
        } catch (err) {
            console.error(err.toString());
        }
    })
    
}

module.exports = { sendEmail }