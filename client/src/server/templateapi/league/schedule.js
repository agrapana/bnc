const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { Schedule } = require('../../templatemodels/league/schedule');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

// router.route('/addschedule').post(auth, (req, res) => {
//     const schedule = new Schedule(req.body);

//     schedule.save((err, doc) => {
//         if (err) return res.json({ success: false, err, message: "ADD FAILED" });
//         res.status(200).json({
//             success: true,
//             doc
//         })
//     });
// })

router.route('/getschedule').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Schedule.
        find().
        populate('currentserver').
        populate('results').
        populate({
            path: 'teamleft',
            populate: {
                path: 'players',
                model: 'Client'
            }
        }).
        populate({
            path: 'teamright',
            populate: {
                path: 'players',
                model: 'Client'
            }
        }).
        populate({
            path: 'league',
            populate: [
                {
                    path: 'currentadmin',
                    model: 'Client'
                },
                {
                    path: 'teams',
                    populate: {
                        path: 'players',
                        model: 'Client'

                    }
                }
            ]
        }).
        sort([[sortBy, order]]).
        exec((err, schedules) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                schedules
            });
        })
})

router.route('/getschedulebyid').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Schedule.
        findOne({ _id: req.query.clientid }).
        populate('currentserver').
        populate('results').
        populate({
            path: 'teamleft',
            populate: {
                path: 'players',
                model: 'Client'
            }
        }).
        populate({
            path: 'teamright',
            populate: {
                path: 'players',
                model: 'Client'
            }
        }).
        sort([[sortBy, order]]).
        exec((err, schedulebyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                schedulebyid
            });
        })
});

router.route('/updateschedule').post(auth, (req, res) => {
    Schedule.findOneAndUpdate(
        { _id: req.query.id },
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

router.route('/deleteschedule/:id').delete(auth, (req, res) => {
    Schedule.findByIdAndRemove(req.params.id,
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