const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { League } = require('../../templatemodels/league');
const { Schedule } = require('../../templatemodels/league/schedule');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/addleague').post(auth, (req, res) => {
    const league = new League({
        name: req.body.name,
        info: req.body.info,
        rules: req.body.rules,
        start: req.body.start,
        currentadmin: [req.user._id],
        accountnumber: req.body.accountnumber,
        accountname: req.body.accountname,
        bank: req.body.bank,
        amount: req.body.amount
    });

    league.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    });
})

router.route('/getleague').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    League.
        find().
        populate('currentadmin').
        populate({
            path: 'teams',
            populate: {
                path: 'players',
                model: 'Client'
            },
        }).
        populate({
            path: 'schedule',
            populate: [
                {
                    path: 'currentserver',
                    model: 'Servers'
                },
                {
                    path: 'teamleft',
                    model: 'Team'
                },
                {
                    path: 'teamright',
                    model: 'Team'
                },
                {
                    path: 'results',
                    model: 'Result'
                },
            ]
        }).
        sort([[sortBy, order]]).
        exec((err, leagues) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                leagues
            });
        })
})

router.route('/getleaguebyid').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    League.
        findOne({ _id: req.query.clientid }).
        populate('currentadmin').
        populate({
            path: 'teams',
            populate: {
                path: 'players',
                model: 'Client'
            },
        }).
        populate({
            path: 'schedule',
            populate: [
                {
                    path: 'currentserver',
                    model: 'Servers'
                },
                {
                    path: 'teamleft',
                    model: 'Team'
                },
                {
                    path: 'teamright',
                    model: 'Team'
                },
                {
                    path: 'results',
                    model: 'Result'
                },
            ]
        }).
        sort([[sortBy, order]]).
        exec((err, leaguebyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                leaguebyid
            });
        })
});

router.route('/updateleague').post(auth, (req, res) => {
    League.findOneAndUpdate(
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

router.route('/updateleagueteam').post(auth, (req, res) => {
    // League.findOne({ _id: req.body._id }, (err, data) => {
    //     if (!data) return res.json({ success: false, err, message: "DATA NOT FOUND" });

    //     data.teams.push(req.body.teams);
    //     data.save((err, updateleague) => {
    //         if (err) return res.json({ success: false, err, message: 'data not saved!' });
    //         return res.status(200).json({
    //             success: true,
    //             updateleague
    //         })
    //     })
    // })
    League.findOneAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                teams: req.body.teams
            }
        },
        { new: true },
        (err, updateleague) => {
            if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
            return res.status(200).json({
                success: true,
                updateleague
            })
        }
    );
})

router.route('/updateleagueschedule').post(auth, (req, res) => {
    const schedule = new Schedule({
        currentserver: req.body.currentserver,
        start: req.body.start,
        teamleft: req.body.teamleft,
        teamright: req.body.teamright
    });

    schedule.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        League.findOneAndUpdate(
            { _id: req.body._id },
            {
                $push: {
                    schedule: doc
                }
            },
            { new: true },
            (err, updateleagueschedule) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
                return res.status(200).json({
                    success: true,
                    updateleagueschedule
                })
            }
        );
    });

})

router.route('/deleteleague/:id').delete(auth, (req, res) => {
    League.findByIdAndRemove(req.params.id,
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