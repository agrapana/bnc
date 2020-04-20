const router = require('express').Router();

//==================================================================
//                             MODELS
//==================================================================
const { Result } = require('../../templatemodels/league/result');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/addresult').post(auth, (req, res) => {
    const result = new Result(req.body);

    result.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    });
})

router.route('/getresult').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Result.
        find().
        populate('team1').
        populate('team2').
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
        populate('team1').
        populate('team2').
        sort([[sortBy, order]]).
        exec((err, resultbyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                resultbyid
            });
        })
});

router.route('/updateresult').post(auth, (req, res) => {
    Result.findOneAndUpdate(
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