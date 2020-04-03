const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

//==================================================================
//                             MODELS
//==================================================================
const { Portfolio } = require('../../templatemodels/portfolio');
const { auth } = require('../../middleware/auth');

//======================================================================
//                              PORTFOLIO
//======================================================================

router.route('/addportfolio').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
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
                fields.images = result.map(file => file);
                const portfolio = new Portfolio(fields);
                portfolio.save((err, doc) => {
                    if (err) return res.json({ success: false, err, message: "ADD FAILED" });
                    res.status(200).json({
                        success: true,
                        doc
                    })
                })
            })
            .catch((err) => {
                if (err) return res.json({ success: false, err });
            })
    })
})

router.route('/getportfolio').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Portfolio.
        find().
        populate('category').
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, portfolios) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                portfolios
            });
        })
})

router.route('/getportfoliobyidmobile').get((req, res) => {

    Portfolio.
        findOne({ _id : req.query.id }).
        populate('category').
        exec((err, singleportfolio) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                singleportfolio
            });
        })
})

router.route('/getportfoliobyid').get((req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');

        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Portfolio.
        find({ '_id': { $in: items } }).
        populate('category').
        exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

router.route('/updateadditionalportfolio').post(auth, (req, res) => {
    Portfolio.findOneAndUpdate(
        { _id: req.query.id },
        {
            $set: {
                'additional': req.body.additional
            }
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

router.route('/updateportfolio').post(auth, (req, res) => {
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
                    Portfolio.findOne({ _id: fields._id }, (err, portfolio) => {

                        if (!err && portfolio) {
                            newPortfolio = new Portfolio(fields);
                            newPortfolio.images = portfolio.images.concat(result);
                            newPortfolio.images = imagesToRemoved ?
                                newPortfolio.images.filter((data) => {
                                    return !imagesToRemoved.includes(data.public_id)
                                })
                                : newPortfolio.images;

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
                            newPortfolio = deleteKey(newPortfolio, '_id');
                            newPortfolio.additional = portfolio.additional;
                            Portfolio.updateOne({ _id: fields._id }, newPortfolio, (err, doc) => {
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

router.route('/deleteportfolio/:id').delete(auth, (req, res) => {
    Portfolio.findByIdAndRemove(req.params.id,
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