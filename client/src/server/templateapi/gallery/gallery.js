const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

//==================================================================
//                             MODELS
//==================================================================
const { Gallery } = require('../../templatemodels/gallery');
const { auth } = require('../../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/addgallery').post(auth, (req, res) => {
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
                    const gallery = new Gallery(fields);
                    gallery.save((err, doc) => {
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

router.route('/getgallery').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Gallery.
        find().
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, galleries) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                galleries
            });
        })
})

router.route('/getgallerybyid').get((req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');

        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Gallery.
        find({ '_id': { $in: items } }).
        exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

router.route('/updategallery').post(auth, (req, res) => {
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
                    Gallery.findOne({ _id: fields._id }, (err, gallery) => {

                        if (!err && gallery) {
                            newGallery = new Gallery(fields);
                            newGallery.images = gallery.images.concat(result);
                            newGallery.images = imagesToRemoved ?
                                newGallery.images.filter((data) => {
                                    return !imagesToRemoved.includes(data.public_id)
                                })
                                : newGallery.images;

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
                            newGallery = deleteKey(newGallery, '_id');
                            Gallery.updateOne({ _id: fields._id }, newGallery, (err, doc) => {
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

router.route('/deletegallery/:id').delete(auth, (req, res) => {
    Gallery.findByIdAndRemove(req.params.id,
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