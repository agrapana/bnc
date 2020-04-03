const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

//==================================================================
//                             MODELS
//==================================================================
const { Product } = require('../../templatemodels/product');
const { auth } = require('../../middleware/auth');

//======================================================================
//                              PRODUCT
//======================================================================

router.route('/addproduct').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        } else {
            let categoryArray;
            if (fields.category) {
                categoryArray = fields.category.split(',');
            }

            // console.log(categoryArray, "<<<<<<<<<category Array")
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
                    const product = new Product(fields);
                    product.category = categoryArray;
                    product.save((err, doc) => {
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
        }
    })
})

router.route('/getproduct').get((req, res) => {

    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
        find().
        populate('brand').
        populate('color').
        populate('size').
        populate('category').
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, product) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                product
            });
        })
})

router.route('/getproducts').post((req, res) => {

    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    if (req.body.filters.category.length > 0) {
        Product.
            find({
                brand: { $all: findArgs.brand },
                category: { $all: findArgs.category }
            }).
            populate('brand').
            populate('color').
            populate('size').
            populate('category').
            sort([[sortBy, order]]).
            skip(skip).
            limit(limit).
            exec((err, products) => {
                if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
                res.status(200).json({
                    success: true,
                    category: products.length,
                    products
                });
            })
    } else {
        Product.
            find(findArgs).
            populate('brand').
            populate('color').
            populate('size').
            populate('category').
            sort([[sortBy, order]]).
            skip(skip).
            limit(limit).
            exec((err, products) => {
                if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
                res.status(200).json({
                    success: true,
                    category: products.length,
                    products
                });
            })
    }

})

router.route('/getbrandandlimit').get((req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 4;

    Product
        .aggregate([
            {
                $match: {
                    brand: mongoose.Types.ObjectId(req.query.id)
                }
            },
            { $sort: { "createdAt": -1 } },
            { $limit: limit },
        ]).exec((err, productbrand) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
                success: true,
                productbrand
            })
        })
})

router.route('/getproductbyidmobile').get((req, res) => {

    Product.
        findOne({ _id: req.query.id }).
        populate('brand').
        populate('color').
        populate('size').
        populate('category').
        exec((err, singleproduct) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                singleproduct
            });
        })
})

router.route('/getproductbyid').get((req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');

        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
        find({ '_id': { $in: items } }).
        populate('brand').
        populate('color').
        populate('size').
        populate('category').
        exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

router.route('/updateadditionalproduct').post(auth, (req, res) => {
    Product.findOneAndUpdate(
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

router.route('/updateproduct').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        } else {
            let imagesToRemoved;
            let categoryArray;
            if (fields.imagesToRemove) {
                imagesToRemoved = fields.imagesToRemove.split(',');
            }
            if (fields.category) {
                categoryArray = fields.category.split(',');
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
                    Product.findOne({ _id: fields._id }, (err, product) => {

                        if (!err && product) {
                            newProduct = new Product(fields);
                            newProduct.images = product.images.concat(result);
                            newProduct.images = imagesToRemoved ?
                                newProduct.images.filter((data) => {
                                    return !imagesToRemoved.includes(data.public_id)
                                })
                                : newProduct.images;

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
                            newProduct = deleteKey(newProduct, '_id');
                            newProduct.category = categoryArray;
                            newProduct.additional = product.additional;
                            Product.findOneAndUpdate({ _id: fields._id }, newProduct, (err, doc) => {
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

router.route('/deleteproduct/:id').delete(auth, (req, res) => {
    Product.findByIdAndRemove(req.params.id,
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