const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Servers } = require('../../templatemodels/server');
const { auth } = require('../../middleware/auth');

//======================================================================
//                              SERVERS
//======================================================================

router.route('/addservers').post(auth, (req, res) => {
    const addservers = new Servers(req.body);

    addservers.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getservers').get((req, res) => {
    Servers.
        find({}, (err, servers) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                servers
            });
        })
})

router.route('/updateservers').post(auth, (req, res) => {
    Servers.findOneAndUpdate(
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

router.route('/deleteservers/:id').delete(auth, (req, res) => {
    Servers.findByIdAndRemove(req.params.id,
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