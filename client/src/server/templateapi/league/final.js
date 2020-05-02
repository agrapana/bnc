const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { Final } = require('../../templatemodels/league/final');
const { auth } = require('../../middleware/auth');
const { clientauth } = require('../../middleware/clientauth');
//==================================================================
//                              API
//==================================================================

router.route('/addteam').post(auth, (req, res) => {
    const team = new Team(req.body);

    team.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    });
})

router.route('/getteams').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Team.
        find().
        populate('currentcaptain').
        populate('players').
        sort([[sortBy, order]]).
        exec((err, teams) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                teams
            });
        })
})

router.route('/getleaguebyid').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Team.
        findOne({ _id: req.query.clientid }).
        populate('currentcaptain').
        populate('players').
        sort([[sortBy, order]]).
        exec((err, teambyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                teambyid
            });
        })
});

router.route('/updateteam').post(auth, (req, res) => {
    Team.findOneAndUpdate(
        { _id: req.body._id },
        {
            $set: req.body
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

router.route('/jointeamleague').post(clientauth, (req, res) => {
    let clientid = req.query.id  ? req.query.id : req.client._id;
    Client.findOne({ _id: clientid }, (err, client) => {
        if (err) return res.json({ success: false, err, message: 'CLIENT NOT FOUND' });
        if (client.registeredteam) return res.json({ success: false, message: 'YOU ARE REGISTERED AT OTHER SERVER' });
        Team.findOneAndUpdate(
            { _id: req.query.teamid },
            {
                $push: {
                    players: clientid
                }
            },
            { new: true }).
            populate('players').
            exec((err, jointeamleague) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });

                client.registeredteam = jointeamleague._id;
                client.save((err, newclient) => {
                    if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
                    return res.status(200).json({
                        success: true,
                        jointeamleague,
                        newclient
                    })
                })
            })

    })
})

router.route('/cancelteamleague').post(clientauth, (req, res) => {
    let clientid = req.query.id  ? req.query.id : req.client._id;
    Client.findOne({ _id: clientid }, (err, client) => {
        if (err) return res.json({ success: false, err, message: 'CLIENT NOT FOUND' });
        Team.findOneAndUpdate(
            { _id: req.query.teamid },
            {
                $pull: {
                    players: clientid
                }
            },
            { new: true }).
            populate('players').
            exec((err, cancelteamleague) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });

                client.registeredteam = undefined;
                client.save((err, newclient) => {
                    if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
                    return res.status(200).json({
                        success: true,
                        cancelteamleague,
                        newclient
                    })
                })
            })

    })
})

router.route('/deleteteam/:id').delete(auth, (req, res) => {
    Team.findByIdAndRemove(req.params.id,
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: "DELETE FAILED" });
            return res.status(200).json({
                success: true,
                doc
            })
        }
    )
})

module.exports = router;