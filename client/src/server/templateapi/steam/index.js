const router = require('express').Router();
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const config = require('./config');
const passport = require('passport');
//==================================================================
//                             MODELS
//==================================================================
const { Client } = require('../../models/client');
const { clientauth } = require('../../middleware/clientauth');
//==================================================================
//                            NEW API
//==================================================================
router.route('/login').get((req, res) => {
    res.render('index', { user: req.user });
});

router.route('/account').get(ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/api/steam/auth');
});

router.route('/auth').get(passport.authenticate('steam', { failureRedirect: '/api/steam/auth' }),
    function (req, res) {
        res.redirect('/api/steam/auth');
    }
);

router.route('/return').get(clientauth, passport.authenticate('steam', { failureRedirect: '/api/steam/auth' }),
    function (req, res) {
        let user = req.user;
        // console.log(user,"<<<<<<<<<<user")
        Client.findOne({ token: req.client.token }, (err, clientexist) => {
            if (err) return res.json({ success: false, err, message: 'please try again!' });
            clientexist.steamid = `${user._json.steamid}`;
            clientexist.steamname = `${user._json.personaname}`;
            clientexist.steamavatar = `${user._json.avatarfull}`;
            clientexist.isConnected = true;
            clientexist.save((err, aftersave) => {
                if (err) return res.json({ success: false, err, message: 'data not saved!' });
                res.redirect('http://192.168.1.6:3000');
            })
        })
    }
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/api/steam/auth');
}
//==================================================================
//                              API
//==================================================================
// var activeClient = {};
//     var options = {
//         promptSteamGuardCode: false,
//         singleSentryfile: false,
//         autoRelogin: true,
//         dataDirectory: null,
//     }

//     function createClient(steamUsername, steamPassword) {

//         var client = new SteamUser(options);
//         client.steamLogin = function () {
//             client.logOn({
//                 "accountName": "demm1csgo3",
//                 "password": "demmyg4nteng",
//             })
//         }
//         client.on('loggedOn', function (details) {
//             console.log(details, "<<<<<!!!!!!!!!!!!!!!!!<<<details");
//             console.log("!!!!!!!!!!!!!!!!!!!!steamid", client.steamID);
//             console.log("<<<<<<<<<<<<<<<<<<<newsteamid", client.steamID.getSteam2RenderedID());
//             console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
//             // client.setPersona(SteamUser.EPersonaState.Online);
//             // client.gamesPlayed(440);
//         });

//         client.on('error', function (err) {
//             switch (err.eresult) {
//                 case 5:
//                     log('error: invalid password');
//                 case 84:
//                     log('error: rate limit exceeded');
//                 case 6:
//                     log('error: logged in elsewhere');
//                 default:
//                     log('error: ' + err.eresult);
//             }

//             stopClient(steamUsername);
//         });

//         return client;
//     }

//     function startClient(steamUsername, steamPassword) {
//         activeClient = createClient(steamUsername, steamPassword);
//         activeClient.steamLogin();
//     }

// function stopClient(steamUsername) {
//     if (typeof activeClient !== 'undefined' && activeClient) {
//         //await activeBots[steamUsername].logOff(); // logOff is not async function?

//         activeClient.logOff(); // logout, but if the bot ran into an error its not logged in
//         delete activeClient; // seems to work, but not if it ran into an error

//         log('client stopped', steamUsername);
//     }
// }

//     function log(message, steamUsername = false) {
//         if (steamUsername) {
//             console.log('[' + steamUsername + '] ' + message);
//         } else {
//             console.log(message);
//         }
//     }

//     async function runTest1() {
//         startClient('', '');
//         // await sleep(5000);
//         // stopClient('');
//         // await sleep(200000);
//     }

//     function sleep(ms) {
//         return new Promise((resolve) => {
//             setTimeout(resolve, ms);
//         });
//     }


//==================================================================
//                              TRY
//==================================================================
// var options = {
//     promptSteamGuardCode: false,
//     singleSentryfile: false,
//     autoRelogin: true,
//     dataDirectory: null,
// }
// var client = new SteamUser(options);

// client.logOn({
//     "accountName": "demm1csgo3",
//     "password": "Demiyun1011",
// })

// client.on('loggedOn', function (details) {
//     console.log(details, "<<<<<!!!!!!!!!!!!!!!!!<<<details");
//     console.log("!!!!!!!!!!!!!!!!!!!!steamid", client.steamID);
//     console.log("<<<<<<<<<<<<<<<<<<<newsteamid", client.steamID.getSteam2RenderedID());
//     console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
//     client.setPersona(SteamUser.EPersonaState.Online);
//     client.gamesPlayed(440);
// });

// router.route('/verifycode').get((req, res) => {
//     console.log("test test")
//     client.on('steamGuard', function (domain, callback) {
//         console.log("Steam Guard code needed from email ending in " + domain);
//         // var code = getCodeSomehow();
//         var code = "6N427";
//         callback(code);
//     });
// })

// router.route('/login').get((req, res) => {
//     client.logOn({
//         "accountName": "demm1csgo3",
//         "password": "demmyg4nteng",
//     })

//     // client.on('loggedOn', function (details) {
//     //     console.log(details, "<<<<<!!!!!!!!!!!!!!!!!<<<details");
//     //     console.log("!!!!!!!!!!!!!!!!!!!!steamid", client.steamID);
//     //     console.log("<<<<<<<<<<<<<<<<<<<newsteamid", client.steamID.getSteam2RenderedID());
//     //     console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
//     //     // client.setPersona(SteamUser.EPersonaState.Online);
//     //     // client.gamesPlayed(440);
//     // });

//     client.on('error', function (err) {
//         switch (err.eresult) {
//             case 5:
//                 log('error: invalid password');
//             case 84:
//                 log('error: rate limit exceeded');
//             case 6:
//                 log('error: logged in elsewhere');
//             default:
//                 log('error: ' + err.eresult);
//         }

//         stopClient(steamUsername);
//     });

//     function stopClient(steamUsername) {
//         if (typeof activeClient !== 'undefined' && activeClient) {
//             //await activeBots[steamUsername].logOff(); // logOff is not async function?

//             activeClient.logOff(); // logout, but if the bot ran into an error its not logged in
//             delete activeClient; // seems to work, but not if it ran into an error

//             log('client stopped', steamUsername);
//         }
//     }
// })


// router.route('/verifycode').get((req, res) => {
//     client.on('steamGuard', function(domain, callback) {
//         console.log("Steam Guard code needed from email ending in " + domain);
//         // var code = getCodeSomehow();
//         var code = "DVWQ4";
//         callback(code);
//     });
// })

// router.route('/logout').get((req, res) => {
//     SteamUser.logOff();
// })
// // router.route('/alreadylogin').get((req,res) => {
// //     client.on('loggedOn', function (details) {
// //         console.log("steamid", client.steamID)
// //         console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
// //         client.setPersona(SteamUser.EPersonaState.Online);
// //         client.gamesPlayed(440);
// //     });
// // })

// router.route('/steamid').get((req, res) => {
//     var SteamCommunity = require('steamcommunity');
//     var SteamID = SteamCommunity.SteamID;

//     console.log(SteamID, "<<<<<<<<<<<steam id")
//     var sid = new SteamID('[U:1:46143802]')
//     console.log(sid.toString());
// })
//==================================================================
//                              TRY
//==================================================================
// router.route('/steamguard').get((req, res) => {
//     var client = new SteamUser();
//     client.on('steamGuard', function(domain, callback) {
//         var code = "5HG4H";
//         callback(code);
//     });
// })

// router.route('/api/steam/auth').get(passport.authenticate('steam', { failureRedirect: 'login' }),
//     function(req, res) {
//       // The request will be redirected to Steam for authentication, so
//       // this function will not be called.
//     });
// )

// router.get('/steam', passport.authenticate('steam', { failureRedirect: 'login' }), function(req, res, next) {

// });

module.exports = router;