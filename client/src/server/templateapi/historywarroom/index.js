const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Historywarroom } = require('../../templatemodels/historywarroom');
const { auth } = require('../../middleware/auth');

//======================================================================
//                            PRODUCT BRAND
//======================================================================

router.route('/addhistorywarroom').post(auth, (req, res) => {
    const historywarroom = new Historywarroom(req.body);

    historywarroom.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/gethistorywarrooms').get((req, res) => {
    Historywarroom.
        find({}, (err, historywarrooms) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                historywarrooms
            });
        })
})

router.route('/updatehistorywarroom').post(auth, (req, res) => {
    Historywarroom.findOneAndUpdate(
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

router.route('/deletehistorywarroom/:id').delete(auth, (req, res) => {
    Historywarroom.findByIdAndRemove(req.params.id,
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