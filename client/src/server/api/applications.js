const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const fs = require('fs');
const mongoose = require('mongoose');

//==================================================================
//                             MODELS
//==================================================================
const { Application } = require('../models/application');
const { auth } = require('../middleware/auth');
const { clientauth } = require('../middleware/clientauth');

//==================================================================
//                           APPLICATION
//==================================================================

router.route('/addapplication').post(auth, (req, res) => {
    const application = new Application(req.body);
    application.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/updateapplication').post(auth, (req, res) => {
    Application.findOneAndUpdate(
        { '_id': req.body._id },
        {
            $set: {
                "description": req.body.description,
                "private": req.body.private,
                "pin": req.body.pin
            }
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'FAILED, PLEASE TRY AGAIN' });
            return res.status(200).json({
                success: true,
                doc
            })
        }
    )

})

router.route('/addapplicationicon').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        }
        // console.log(files, "<<<<<<<<<<<files")
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
                fields.icons = result.map(file => file);
                Application.findOneAndUpdate(
                    { "_id": fields._id },
                    {
                        $set: {
                            "icons": fields.icons,
                            "iconsexist": true
                        }
                    },
                    { new: true },
                    (err, doc) => {
                        if (err) return res.json({ success: false, err, message: 'TRY AGAIN!!' });
                        return res.status(200).json({
                            success: true,
                            doc
                        })
                    }
                )
            })
            .catch((err) => {
                if (err) return res.json({ success: false, err });
            })
    })
})

router.route('/addapplicationimage').post(auth, (req, res) => {
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
                Application.findOneAndUpdate(
                    { "_id": fields._id },
                    {
                        $set: {
                            "images": fields.images,
                            "imagesexist": true
                        }
                    },
                    { new: true },
                    (err, doc) => {
                        if (err) return res.json({ success: false, err, message: 'TRY AGAIN!!' });
                        return res.status(200).json({
                            success: true,
                            doc
                        })
                    }
                )
            })
            .catch((err) => {
                if (err) return res.json({ success: false, err });
            })
    })
})

router.route('/updateapplicationimage').post(auth, (req, res) => {
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
            // console.log(imagesToRemoved, "!!!<!<!<!<!<!<!<!<!<!<!<!< imagesToRemoved")
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
                    Application.findOne({ _id: fields._id }, (err, apps) => {
                        // console.log(fields, "<<<<<<<<<<fields fields")
                        // console.log(result, "<<<<<<<<<<result result")
                        // console.log(apps, "<<<<<!!!!!!!!!!!<<<<<apps apps")
                        if (!err && apps) {
                            let newimages = apps.images.concat(result);
                            // console.log(newimages, "!!!!!!!!!!!!newimages newimages newimages images")
                            newimages = imagesToRemoved ?
                                newimages.filter((data) => {
                                    return !imagesToRemoved.includes(data.public_id)
                                })
                                : newimages;
                            let imagesexist = newimages.length > 0;
                            // console.log(imagesexist, "<!<!<!<!<!<!<!imagesexistimagesexistimagesexistimagesexist")
                            // console.log(newimages, "<!<!<!<!<!<!<!newimagesnewimagesnewimagesnewimagesnewimages")
                            // const deleteKey = (obj, path) => {
                            //     const _obj = JSON.parse(JSON.stringify(obj));
                            //     const keys = path.split('.');

                            //     keys.reduce((acc, key, index) => {
                            //         if (index === keys.length - 1) {
                            //             delete acc[key];
                            //             return true;
                            //         }
                            //         return acc[key];
                            //     }, _obj);

                            //     return _obj;
                            // }
                            // newApps = deleteKey(newApps, '_id');
                            // console.log(newApps, "<<<<<<<<<new apps")

                            Application.findByIdAndUpdate(
                                { _id: fields._id },
                                {
                                    $set: {
                                        "images": newimages,
                                        "imagesexist": imagesexist
                                    }
                                },
                                { new: true },
                                (err, doc) => {
                                    if (err) return res.json({ success: false, err, message: 'TRY AGAIN!!' });
                                    return res.status(200).json({
                                        success: true,
                                        doc
                                    })
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

router.route('/getapk').get(auth, (req, res) => {
    let publicid = req.query.publicid;
    const file = `${__basedir}/allapk/${publicid}.apk`;
    //     res.setHeader('Content-disposition', `attachment; filename=${publicid}.apk`);
    // res.setHeader('Content-type', 'application/octet-stream');
    res.set('Content-Type', 'application/octet-stream')
    res.sendFile(file);
    // return res.status(200).json({
    //     success: true,
    //     file,
    //     public_id: publicid
    // })
})

router.route('/getapkmobile').get(clientauth, (req, res) => {
    let publicid = req.query.publicid;
    const file = `${__basedir}/allapk/${publicid}.apk`;
    // console.log(file, "<<<<<<<<<filefilfiel")
    //     res.setHeader('Content-disposition', `attachment; filename=${publicid}.apk`);
    // res.setHeader('Content-type', 'application/octet-stream');

    res.set('Content-Type', 'application/octet-stream')
    res.sendFile(file);

    // res.status(200).json({
    //     success: true,
    //     file
    // })
})

router.route('/getapplications').get(auth, (req, res) => {
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Application.
        find().
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, applications) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                applications
            });
        })
})

router.route('/getapplication').get(clientauth, (req, res) => {
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Application.
        find().
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, apps) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                apps
            });
        })
})

router.route('/thisapplication').get(clientauth, (req, res) => {

    Application.
        findOne({ _id : req.query.id }, (err, thisapp) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                thisapp
            });
        })
})

// router.route('/getapplication').get((req, res) => {

//     let order = req.query.order ? req.query.order : 'desc';
//     let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
//     let limit = req.query.limit ? parseInt(req.query.limit) : 100;

//     Application.
//         find().
//         sort([[sortBy, order]]).
//         limit(limit).
//         exec((err, applications) => {
//             if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
//             res.status(200).json({
//                 success: true,
//                 applications
//             });
//         })
// })

router.route('/addapplicationapk').post(auth, (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./allapk";
    form.keepExtensions = true;
    form.on('file', (name, file) => {
        fs.rename(file.path, form.uploadDir + "/" + file.name, function (err) {
            if (err) throw err;
        });
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ success: false, err, message: "FILE ERROR" });
        }
        // console.log(fields, "<<<<<<<<<<<<<fields")
        // console.log(files, "<<<<<<<<!!!!!!!!!!<<<<<files")
        let thisid = fields._id;

        let newvalue = Object.values(files).map(file => {
            // const path = require('path');
            const name = file.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            // const ext = name.substring(lastDot + 1);
            return {
                public_id: `${fileName}`,
                url: `allapk/${fileName}.apk`
            }
        })
        fields.url = newvalue;
        delete fields._id;
        // console.log(fields, "<<<<<<<<<<<<<!!!!!!!!!!!!!!fields after")
        Application.findOneAndUpdate(
            { "_id": thisid },
            {
                $set: {
                    "appsexist": true
                },
                $push: {
                    "history": {
                        $each: [fields], $position: 0
                    }
                }
            },
            { new: true },
            (err, doc) => {
                if (err) return res.json({ success: false, err, message: 'FAILED, PLEASE TRY AGAIN' });
                return res.status(200).json({
                    success: true,
                    doc
                })
            }
        )

    })
})

router.route('/publishapplication').post(auth, (req, res) => {
    Application.findOneAndUpdate(
        { "_id": req.body._id },
        {
            $set: {
                "publish": true
            }
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'FAILED, PLEASE TRY AGAIN' });
            return res.status(200).json({
                success: true,
                doc
            })
        }
    )
})

router.route('/unpublishapplication').post(auth, (req, res) => {
    Application.findOneAndUpdate(
        { "_id": req.body._id },
        {
            $set: {
                "publish": false
            }
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'FAILED, PLEASE TRY AGAIN' });
            return res.status(200).json({
                success: true,
                doc
            })
        }
    )
})

module.exports = router;