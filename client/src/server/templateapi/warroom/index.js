const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Warroom } = require('../../templatemodels/warroom');
const { Client } = require('../../models/client');
const { auth } = require('../../middleware/auth');
const { clientauth } = require('../../middleware/clientauth');
//======================================================================
//                            PRODUCT BRAND
//======================================================================

router.route('/createwarroom').post(clientauth, (req, res) => {
    // Warroom.findOne({ 'currentserver': req.body.currentserver, 'isOpen': false }, (err, activeserver) => {
    //     if (activeserver) return res.json({ success: false, err, message: 'SERVER IN USE!!' })


    // })
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
        find().
        populate('currentserver').
        populate('currentadmin').
        populate('players').
        exec((err, warrooms) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                warrooms
            });
        })
})

router.route('/getwarroomsbyid').get((req, res) => {
    Warroom.
        findOne({ _id: req.query.clientid }).
        populate('currentserver').
        populate('currentadmin').
        populate('players').
        exec((err, warroomsbyid) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                warroomsbyid
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

router.route('/joinwarroom').post(clientauth, (req, res) => {
    Client.findOne({ _id: req.query.id }, (err, client) => {
        if (err) return res.json({ success: false, message: 'UPDATE CLIENT FAILED' });
        if (client.registeredwarroom) return res.json({ success: false, message: 'YOU ARE REGISTERED AT OTHER SERVER' });
        Warroom.findOneAndUpdate(
            { _id: req.query.roomid },
            {
                $push: {
                    players: req.query.id
                }
            },
            { new: true }).
            populate('currentserver').
            populate('currentadmin').
            populate('players').
            exec((err, joinwarroom) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });

                client.registeredwarroom = joinwarroom._id;
                client.save((err, newclient) => {
                    if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
                    return res.status(200).json({
                        success: true,
                        joinwarroom,
                        newclient
                    })
                })

                // Client.findOneAndUpdate(
                //     { _id: req.query.id },
                //     {
                //         $set: {
                //             registeredwarroom: joinwarroom._id
                //         }
                //     },
                //     { new: true }).
                //     exec((err, newclient) => {
                //         if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
                //         return res.status(200).json({
                //             success: true,
                //             joinwarroom,
                //             newclient
                //         })
                //     })
            })

    })

})

router.route('/cancelwarroom').post(clientauth, (req, res) => {
    Warroom.findOneAndUpdate(
        { _id: req.query.roomid },
        {
            $pull: {
                players: req.query.id
            }
        },
        { new: true }).
        populate('currentserver').
        populate('currentadmin').
        populate('players').
        exec((err, cancelwarroom) => {
            if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
            Client.findOne({ _id: req.query.id }, (err, client) => {
                if (err) return res.json({ success: false, message: 'UPDATE CLIENT FAILED' });
                client.registeredwarroom = undefined;
                client.save((err, newclient) => {
                    if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
                    return res.status(200).json({
                        success: true,
                        cancelwarroom,
                        newclient
                    })
                })
            })
            // Client.findOneAndUpdate(
            //     { _id: req.query.id },
            //     {
            //         $set: {
            //             registeredwarroom: undefined
            //         }
            //     },
            //     { new: true }).
            //     exec((err, newclient) => {
            //         if (err) return res.json({ success: false, err, message: "UPDATE CLIENT FAILED" });
            //         return res.status(200).json({
            //             success: true,
            //             cancelwarroom,
            //             newclient
            //         })
            //     })
        });
})

router.route('/closewarroom').post(clientauth, (req, res) => {
    Warroom.findOne({ '_id': req.query.roomid, 'isOpen': true }, (err, activeserver) => {
        if (!activeserver) return res.json({ success: false, err, message: 'SERVER UNAVAILABLE' })
        Warroom.findOneAndUpdate(
            { _id: req.query.roomid },
            {
                $set: {
                    isOpen: false,
                    isProcessing: false,
                    isClosed: true
                }
            },
            { new: true }).
            populate('currentserver').
            populate('currentadmin').
            populate('players').
            exec((err, closewarroom) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
                return res.status(200).json({
                    success: true,
                    closewarroom
                })
            }
            );
    })

})

router.route('/nextstepwarroom').post(clientauth, (req, res) => {
    Warroom.findOne({ '_id': req.query.roomid, 'isOpen': true }, (err, activeserver) => {
        if (!activeserver) return res.json({ success: false, err, message: 'SERVER UNAVAILABLE' })
        Warroom.findOneAndUpdate(
            { _id: req.query.roomid },
            {
                $set: {
                    isProcessing: true
                }
            },
            { new: true }).
            populate('currentserver').
            populate('currentadmin').
            populate('players').
            exec((err, nextstepwarroom) => {
                if (err) return res.json({ success: false, err, message: "UPDATE FAILED" });
                return res.status(200).json({
                    success: true,
                    nextstepwarroom
                })
            }
            );
    })

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