const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const SALT_I = 10;
const twilio = require('twilio');

require('dotenv').config();

var accountSid = process.env.SID_ACCOUNT; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

//==================================================================
//                             MODELS
//==================================================================
const { Client } = require('../models/client');
const { Token } = require('../models/token');
const { clientauth } = require('../middleware/clientauth');

//==================================================================
//                              API
//==================================================================

router.route('/clientauth').get(clientauth, (req, res) => {
    res.status(200).json({
        email: req.client.email,
        name: req.client.name,
        phone: req.client.phone,
        extension: req.client.extension,
        carrier: req.client.carrier,
        pin: req.client.pin,
        details: req.client.details,
        notifications: req.client.notifications,
        steamid: req.client.steamid,
        steamname: req.client.steamname,
        steamavatar: req.client.steamavatar,
        headshotpercentage: req.client.headshotpercentage,
        totalkill: req.client.totalkill,
        totaldeath: req.client.totaldeath,
        totalassist: req.client.totalassist,
        totalmvp: req.client.totalmvp,
        totalpoint: req.client.totalpoint,
        totalkilldeath: req.client.totalkilldeath,
        totalscore: req.client.totalscore,
        totaladr: req.client.totaladr,
        registeredwarroom: req.client.registeredwarroom,
        registeredteam: req.client.registeredteam,
        isAuth: req.client.isAuth,
        isActive: req.client.isActive,
        isApproved: req.client.isApproved,
        isNamePin: req.client.isNamePin,
        isConnected: req.client.isConnected,
        isFirstTime: req.client.isFirstTime,
        friends: req.client.friends,
        images: req.client.images,
        role: req.client.role,
        profile: req.client.profile,
        masteradmin: req.client.masteradmin,
        details: req.client.details,
        createdAt: req.client.createdAt
    })
})

router.route('/login').post((req, res) => {

    Client.findOne(
        { 'phone': req.body.phone }, (err, client) => {
            if (!client) return res.json({ success: false, message: 'PLEASE REGISTER AT MOBILE APP !!' });
            if (client.isActive === true) {
                // check password
                client.comparePIN(req.body.pin, (err, isMatch) => {
                    if (!isMatch) return res.json({ success: false, message: 'WRONG PIN' });

                    // generate a token
                    client.generateToken((err, client) => {
                        if (err) return res.json({ success: false, err, message: 'GENERATE TOKEN FAILED, PLEASE TRY AGAIN' });
                        res.cookie('lumisoft_client_token_auth', client.token).status(200).json({
                            success: true,
                            client
                        })
                    })
                })
            } else {
                return res.json({ success: false, message: 'ACCOUNT INACTIVE' });
            }
        })
});

router.route('/logout').get(clientauth, (req, res) => {
    Client.findOneAndUpdate(
        { token: req.client.token },
        {
            $set : {
                token: ''
            }            
        },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'LOGOUT FAILED, PLEASE TRY AGAIN' });
            return res.status(200).send({
                success: true
            })
        }
    )
})

router.route('/namepin').post((req, res) => {
    Client.findOne({ 'token': req.query.token }, (err, clientexist) => {
        if (err) return res.json({ success: false, err, message: 'please relogin!' });
        clientexist.name = req.body.name;
        clientexist.pin = req.body.pin.toString();
        clientexist.isNamePin = true;
        clientexist.isActive = true;
        clientexist.save((err, aftersave) => {
            if (err) return res.json({ success: false, err, message: 'data not saved!' });
            return res.status(200).json({
                success: true,
                clientexist: aftersave
            })
        })
    })

})

router.route('/skipwelcome').post((req, res) => {
    Client.findOne({ 'token': req.query.token }, (err, clientexist) => {
        if (err) return res.json({ success: false, err, message: 'please retry!' });
        clientexist.isFirstTime = false;
        clientexist.save((err, aftersave) => {
            if (err) return res.json({ success: false, err, message: 'data not saved!' });
            return res.status(200).json({
                success: true,
                clientexist: aftersave
            })
        })
    })
})

router.route('/verifyphone').post((req, res) => {
    // console.log(req.body, "get in to verify")
    let phonenumber = req.body.extension + req.body.phone;
    // console.log(phonenumber, "phonenumber")
    Client.findOne(
        { 'phone': req.body.phone }, (err, clientexist) => {
            // console.log(clientexist, "<<<<<<<<clientexistclientexistclientexist")
            if (clientexist) {
                client.verify.services(process.env.VERIFICATION_SID)
                    .verifications
                    .create({ to: phonenumber, channel: 'sms' })
                    .then(service => {
                        // console.log(service, "<<<<<<<<<servicdeeee!!!!!!!!!!!!!!")
                        if (service) {
                            // console.log(clientexist.sendcodeattempts, "<<<<<<<<<<<<clientexist.sendcodeattempts")
                            // console.log(service.sendCodeAttempts, "<<<<<<<<<<<<service.sendCodeAttempts")
                            let newsendcodeattempts = clientexist.sendcodeattempts.concat(service.sendCodeAttempts)
                            clientexist.sendcodeattempts = newsendcodeattempts;
                            clientexist.save((err, aftersave) => {
                                if (err) return res.json({ success: false, err, message: 'network error!' });
                                var token = new Token({
                                    uid: clientexist._id,
                                    token: crypto.randomBytes(16).toString('hex')
                                })

                                token.save((err, tokendoc) => {
                                    if (err) return res.json({ success: false, err, message: 'register failed, please try again' });
                                    return res.status(200).json({
                                        success: true,
                                        doc: aftersave,
                                        tokendoc
                                    })
                                })
                            })

                        } else {
                            return res.json({
                                success: false,
                                message: 'failed, please try again'
                            })
                        }
                    });
            } else {
                client.verify.services(process.env.VERIFICATION_SID)
                    .verifications
                    .create({ to: phonenumber, channel: 'sms' })
                    .then(service => {
                        if (service) {
                            let datatostore = req.body;
                            datatostore.carrier = service.lookup.carrier.name;
                            datatostore.sendcodeattempts = service.sendCodeAttempts;
                            // console.log(datatostore, "<<<<<<<<data to store")
                            newclient = new Client(datatostore);
                            newclient.save((err, doc) => {
                                if (err) return res.json({ success: false, err, message: 'register failed, please try again' });
                                // console.log(doc, "<<<<<<<<doc doc doc")
                                var token = new Token({
                                    uid: newclient._id,
                                    token: crypto.randomBytes(16).toString('hex')
                                })

                                token.save((err, tokendoc) => {
                                    if (err) return res.json({ success: false, err, message: 'register failed, please try again' });
                                    return res.status(200).json({
                                        success: true,
                                        doc,
                                        tokendoc
                                    })
                                })
                            })
                        } else {
                            return res.json({
                                success: false,
                                message: 'failed, please try again'
                            })
                        }
                    });
            }
        }
    )
})

router.route('/confirmphonenumber/:token').post((req, res) => {
    // console.log(req.body, "<<<<<<<<<<reqbody")
    // console.log(req.params.token, "<<<<<<<<<<req paramstoken")
    let phonenumber = req.body.extension + req.body.phone;
    Token.findOne({ 'token': req.params.token }, (err, token) => {
        if (!token) return res.json({ success: false, err, message: 'Please try again!' });

        Client.findOne({ '_id': token.uid }, (err, currentclient) => {
            if (!currentclient) return res.json({ success: false, err, message: 'Please try again!' })

            client.verify.services(process.env.VERIFICATION_SID)
                .verificationChecks
                .create({ to: phonenumber, code: req.body.code })
                .then(verification_check => {
                    // console.log(verification_check, "<<<<<<<verification_checkverification_check")
                    if (verification_check.valid === true && verification_check.status === "approved") {
                        currentclient.isApproved = true;
                        currentclient.isAuth = true;
                        currentclient.codeapproved.push(verification_check.dateUpdated)
                        currentclient.save((err, aftersave) => {
                            if (err) return res.json({ success: false, err, message: 'network error!' });
                            Token.findByIdAndRemove(token._id, (err, doc) => {
                                if (err) return res.json({ success: false, err, message: 'token not deleted' });
                                aftersave.generateToken((err, newclient) => {
                                    if (err) return res.json({ success: false, err, message: 'PLEASE TRY AGAIN!' });
                                    res.cookie('lumisoft_library_auth', newclient.token).status(200).json({
                                        success: true,
                                        newclient
                                    })
                                })
                            })
                        })
                    } else {
                        return res.json({
                            success: false,
                            message: 'wrong pin!'
                        })
                    }
                });
        })
    })
})

module.exports = router;