const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

//==================================================================
//                             MODELS
//==================================================================
const { Slider } = require('../../templatemodels/slider');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/addslider').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        } else {
            let res_promises = Object.values(files).map(file => new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(file.path,
                    {
                        use_filename: true,
                        unique_filename: false,
                        resource_type: "auto"

                    },
                    function (error, result) {
                        if (error) reject(error)
                        else resolve({
                            public_id: result.public_id,
                            url: result.secure_url
                        })
                    });
            }))
            Promise.all(res_promises)
                .then(result => {
                    fields.images = result.map(file => file);
                    const slider = new Slider(fields);
                    slider.save((err, doc) => {
                        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
                        res.status(200).json({
                            success: true,
                            doc
                        })
                    });
                })
                .catch((err) => {
                    if (err) return res.json({ success: false, err });
                })
        }
    });
})

router.route('/getslider').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Slider.
        find().
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, sliders) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                sliders
            });
        })
})

router.route('/getsliderbyid').get((req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');

        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Slider.
        find({ '_id': { $in: items } }).
        exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

router.route('/updateslider').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        } else {
            let imagesToRemoved;
            if (fields.imagesToRemove) {
                imagesToRemoved = fields.imagesToRemove.split(',');
            }

            let res_promises = Object.values(files).map(file => new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(file.path,
                    {
                        use_filename: true,
                        unique_filename: false,
                        resource_type: "auto"

                    },
                    function (error, result) {
                        if (error) reject(error)
                        else resolve({
                            public_id: result.public_id,
                            url: result.secure_url
                        })
                    });
            }))
            Promise.all(res_promises)
                .then(result => {
                    Slider.findOne({ _id: fields._id }, (err, slider) => {

                        if (!err && slider) {
                            newSlider = new Slider(fields);
                            newSlider.images = slider.images.concat(result);
                            newSlider.images = imagesToRemoved ?
                                newSlider.images.filter((data) => {
                                    return !imagesToRemoved.includes(data.public_id)
                                })
                                : newSlider.images;

                            const deleteKey = (obj, path) => {
                                const _obj = JSON.parse(JSON.stringify(obj));
                                const keys = path.split('.');

                                keys.reduce((acc, key, index) => {
                                    if (index === keys.length - 1) {
                                        delete acc[key];
                                        return true;
                                    }
                                    return acc[key];
                                }, _obj);

                                return _obj;
                            }
                            newSlider = deleteKey(newSlider, '_id');
                            Slider.updateOne({ _id: fields._id }, newSlider, (err, doc) => {
                                if (err) {
                                    res.json({ success: false, err });
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        doc
                                    })
                                }
                            })
                        }
                    })

                })
                .catch((error) => {
                    if (error) return res.json({ success: false, error });
                })
        }
    });
})

router.route('/deleteslider/:id').delete(auth, (req, res) => {
    Slider.findByIdAndRemove(req.params.id,
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