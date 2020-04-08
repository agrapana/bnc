const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Warroom } = require('../../templatemodels/warroom');
const { auth } = require('../../middleware/auth');
const { clientauth } = require('../../middleware/clientauth');
//======================================================================
//                            PRODUCT BRAND
//======================================================================

router.route('/createwarroom').post(clientauth, (req, res) => {
    const warroom = new Warroom(req.body);

    warroom.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getwarrooms').get((req, res) => {
    Warroom.
        find({}, (err, warrooms) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                warrooms
            });
        })
})

router.route('/updatewarroom').post(clientauth, (req, res) => {
    Warroom.findOneAndUpdate(
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

router.route('/deletewarroom/:id').delete(auth, (req, res) => {
    Warroom.findByIdAndRemove(req.params.id,
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