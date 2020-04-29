const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { Result } = require('../../templatemodels/league/result');
const { Schedule } = require('../../templatemodels/league/schedule');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/addresult').post(auth, (req, res) => {
    const result = new Result({
        map: req.body.map,
        results: [req.body.results]
    });

    result.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        Schedule.findOneAndUpdate(
            { _id: req.query.id },
            {
                $push: {
                    results: doc._id
                }
            },
            { new: true },
            (err, newschedule) => {
                if (err) return res.json({ success: false, err, message: "ADD DATA FAILED" });
                return res.status(200).json({
                    success: true,
                    doc,
                    newschedule
                })
            }
        )
    });
})

router.route('/getresult').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Result.
        find().
        sort([[sortBy, order]]).
        exec((err, results) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                results
            });
        })
})

router.route('/getresultbyid').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Result.
        findOne({ _id: req.query.clientid }).
        sort([[sortBy, order]]).
        exec((err, resultbyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                resultbyid
            });
        })
});

router.route('/getstatisticteamleftbyid').get((req, res) => {

    Result.aggregate([
        {
            "$match": {
                "results.teamleft.players._id": "5ea02f280be21c7434748e4c"
            }
        },
        { "$unwind": "$results" },
        { "$unwind": "$results.teamleft.players" },
        {
            "$match": {
                "results.teamleft.players._id": "5ea02f280be21c7434748e4c"
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "total": {
                    "$sum": {
                        '$convert': { 'input': '$results.teamleft.players.kill', 'to': 'int' }
                        // '$toInt': "results.teamleft.players.kill"
                    }
                }
            }
        },
    ]).exec((err, statistic) => {
        if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
        res.status(200).json({
            success: true,
            statistic
        });
    })
});

router.route('/getstatisticteamrightbyid').get((req, res) => {

    Result.aggregate([
        {
            "$match": {
                "results.teamright.players._id": "5ea02f280be21c7434748e4c"
            }
        },
        { "$unwind": "$results" },
        { "$unwind": "$results.teamright.players" },
        {
            "$match": {
                "results.teamright.players._id": "5ea02f280be21c7434748e4c"
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "total": {
                    "$sum": {
                        '$convert': { 'input': '$results.teamright.players.kill', 'to': 'int' }
                        // '$toInt': "results.teamright.players.kill"
                    }
                }
            }
        },
    ]).exec((err, statistic) => {
        if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
        res.status(200).json({
            success: true,
            statistic
        });
    })
});

router.route('/updateresult').post(auth, (req, res) => {
    if (req.query.type === "teamleft") {
        Result.findOneAndUpdate(
            { _id: req.query.resultid },
            {
                $push: {
                    'results.0.teamleft.players': req.body
                }
            },
            { new: true },
            (err, newteamleft) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
                return res.status(200).json({
                    success: true,
                    updateResult: newteamleft
                })
            }
        )
    } else {
        Result.findOneAndUpdate(
            { _id: req.query.resultid },
            {
                $push: {
                    'results.0.teamright.players': req.body
                }
            },
            { new: true },
            (err, newteamright) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
                return res.status(200).json({
                    success: true,
                    updateResult: newteamright
                })
            }
        )
    }

    // Result.findOne(
    //     { _id: req.query.resultid }, (err, resultexist) => {
    //         if (!resultexist) return res.json({ success: false, message: 'RESULT EMPTY' });
    //         console.log(resultexist, "<<<<<<<<<<<<<result exist")
    //         console.log(req.query.type, "<teypeypeypeypeye")
    //         if (req.query.type === "teamleft") {
    //             console.log("teamleft")
    //             resultexist.results[0].teamleft.players.push(req.body);
    //             console.log(resultexist, "resultexist resultexist");
    //             resultexist.save((err, newteamleft) => {
    //                 console.log(newteamleft, "newteamleft <<<<<<<<<<<<<<")
    //                 if (err) return res.json({ success: false, err, message: 'UPDATE FAILED' });
    //                 return res.status(200).json({
    //                     success: true,
    //                     updateResult: newteamleft
    //                 })
    //             })
    //         } else {
    //             console.log("teamright")
    //             resultexist.results[0].teamright.players.push(req.body);
    //             resultexist.save((err, newteamright) => {
    //                 if (err) return res.json({ success: false, err, message: 'UPDATE FAILED' });
    //                 return res.status(200).json({
    //                     success: true,
    //                     updateResult: newteamright
    //                 })
    //             })
    //         }

    //     }
    // )
})

router.route('/deleteresult/:id').delete(auth, (req, res) => {
    Result.findByIdAndRemove(req.params.id,
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