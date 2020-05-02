const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { League } = require('../../templatemodels/league');
const { Group } = require('../../templatemodels/league/group');
const { auth } = require('../../middleware/auth');
const { clientauth } = require('../../middleware/clientauth');
//==================================================================
//                              API
//==================================================================

router.route('/addgroup').post(auth, (req, res) => {
    const group = new Group(req.body);

    group.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        League.findOneAndUpdate(
            { _id: req.query.id },
            {
                $push: {
                    group: doc._id
                }
            },
            { new: true },
            (err, leaguedata) => {
                if (err) return res.json({ success: false, err, message: "ADD TO LEAGUE FAILED" });
                return res.status(200).json({
                    success: true,
                    doc,
                    league: leaguedata
                })
            }
        )
    });
})

router.route('/getgroups').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Group.
        find().
        populate('teams').
        sort([[sortBy, order]]).
        exec((err, groups) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                groups
            });
        })
})

// router.route('/getleaguebyid').get((req, res) => {

//     let order = req.query.order ? req.query.order : 'desc';
//     let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

//     Team.
//         findOne({ _id: req.query.clientid }).
//         populate('currentcaptain').
//         populate('players').
//         sort([[sortBy, order]]).
//         exec((err, teambyid) => {
//             if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
//             res.status(200).json({
//                 success: true,
//                 teambyid
//             });
//         })
// });

router.route('/pushteamtogroup').post(auth, (req, res) => {
    Group.findOneAndUpdate(
        { _id: req.query.id },
        {
            $push: {
                teams: req.body.teams
            }
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
            return res.status(200).json({
                success: true,
                doc
            })
        }
    );
})

// router.route('/jointeamleague').post(clientauth, (req, res) => {
//     let clientid = req.query.id  ? req.query.id : req.client._id;
//     Client.findOne({ _id: clientid }, (err, client) => {
//         if (err) return res.json({ success: false, err, message: 'CLIENT NOT FOUND' });
//         if (client.registeredteam) return res.json({ success: false, message: 'YOU ARE REGISTERED AT OTHER SERVER' });
//         Team.findOneAndUpdate(
//             { _id: req.query.teamid },
//             {
//                 $push: {
//                     players: clientid
//                 }
//             },
//             { new: true }).
//             populate('players').
//             exec((err, jointeamleague) => {
//                 if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });

//                 client.registeredteam = jointeamleague._id;
//                 client.save((err, newclient) => {
//                     if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
//                     return res.status(200).json({
//                         success: true,
//                         jointeamleague,
//                         newclient
//                     })
//                 })
//             })

//     })
// })

// router.route('/cancelteamleague').post(clientauth, (req, res) => {
//     let clientid = req.query.id  ? req.query.id : req.client._id;
//     Client.findOne({ _id: clientid }, (err, client) => {
//         if (err) return res.json({ success: false, err, message: 'CLIENT NOT FOUND' });
//         Team.findOneAndUpdate(
//             { _id: req.query.teamid },
//             {
//                 $pull: {
//                     players: clientid
//                 }
//             },
//             { new: true }).
//             populate('players').
//             exec((err, cancelteamleague) => {
//                 if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });

//                 client.registeredteam = undefined;
//                 client.save((err, newclient) => {
//                     if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
//                     return res.status(200).json({
//                         success: true,
//                         cancelteamleague,
//                         newclient
//                     })
//                 })
//             })

//     })
// })

// router.route('/deleteteam/:id').delete(auth, (req, res) => {
//     Team.findByIdAndRemove(req.params.id,
//         (err, doc) => {
//             if (err) return res.json({ success: false, err, message: "DELETE FAILED" });
//             return res.status(200).json({
//                 success: true,
//                 doc
//             })
//         }
//     )
// })

module.exports = router;