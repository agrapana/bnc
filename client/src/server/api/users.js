const router = require('express').Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const SALT_I = 10;
const dotenv = require('dotenv').config();
const { sendEmail } = require('../utils/mail');
//==================================================================
//                             MODELS
//==================================================================
const { User } = require('../models/user');
const { Token } = require('../models/token');
const { auth } = require('../middleware/auth');

//==================================================================
//                              API
//==================================================================

router.route('/auth').get(auth, (req, res) => {
    res.status(200).json({
        isAuth: req.user.isAuth,
        isActive: req.user.isActive,
        email: req.user.email,
        name: req.user.name,
        phone: req.user.phone,
        details: req.user.details,
        notifications: req.user.notifications,
        role: req.user.role,
        masteradmin: req.user.masteradmin,
        details: req.user.details,
        notifications: req.user.notifications,
        createdAt: req.user.createdAt
    })
})

// router.route('/register').post((req, res) => {
//     User.findOne({ 'email': req.body.email }, (err, user) => {
//         if (user) return res.json({
//             success: false, err, message: 'EMAIL IS TAKEN, PLEASE CHOOSE OTHER EMAIL'
//         })

//         user = new User(req.body);
//         user.save((err, doc) => {
//             if (err) return res.json({ success: false, err, message: 'REGISTER FAILED, PLEASE TRY AGAIN' });

//             var token = new Token({
//                 uid: user._id,
//                 token: crypto.randomBytes(16).toString('hex')
//             })

//             token.save((err, tokendoc) => {
//                 if (err) return res.json({ success: false, err, message: 'REGISTER FAILED, PLEASE TRY AGAIN' });
//                 sendEmail(user, token, "verification")
//                 return res.status(200).json({
//                     success: true,
//                     doc,
//                     tokendoc
//                 })
//             })
//         })
//     })
// });

router.route('/initialinstallation').post((req, res) => {
    const user = new User({
        name: dotenv.parsed.DEFAULTNAME,
        email: dotenv.parsed.DEFAULTEMAIL,
        password: dotenv.parsed.DEFAULTPASSWORD,
        isAuth: true,
        isActive: true,
        masteradmin: 1,
        phone: dotenv.parsed.DEFAULTPHONE
    });
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: 'INITIAL INSTALLATION FAILED, PLEASE TRY AGAIN' });
        return res.status(200).json({
            success: true,
            doc
        })
    })
});

router.route('/adminusers').get((req, res) => {
    User.
        find({}, (err, users) => {
            if (err) return res.json({ success: false, err, message: "GET USERS FAILED" });
            res.status(200).json({
                success: true,
                users
            });
        })
})

router.route('/addnew').post(auth, (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (user) return res.json({
            success: false, err, message: 'EMAIL IS TAKEN, PLEASE CHOOSE OTHER EMAIL'
        })
        if (req.user.masteradmin < 1) {
            return res.json({
                success: false, err, message: 'YOU ARE NOT AUTHORIZE TO ADD USER'
            })
        }

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
                    const user = new User(fields);
                    user.save((err, doc) => {
                        if (err) return res.json({ success: false, err, message: 'REGISTER FAILED, PLEASE TRY AGAIN' });

                        var token = new Token({
                            uid: user._id,
                            token: crypto.randomBytes(16).toString('hex')
                        })

                        token.save((err, tokendoc) => {
                            if (err) return res.json({ success: false, err, message: 'REGISTER FAILED, PLEASE TRY AGAIN' });
                            sendEmail(user, token, "verification")
                            return res.status(200).json({
                                success: true,
                                doc,
                                tokendoc
                            })
                        })
                    })
                })
                .catch((err) => {
                    if (err) return res.json({ success: false, err });
                })
        })
    })
});

router.route('/userupdate').post(auth, (req, res) => {

    if (req.user.masteradmin < 1) {
        return res.json({
            success: false, err, message: 'YOU ARE NOT AUTHORIZE TO UPDATE USER'
        })
    }

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
                    User.findOne({ _id: fields._id }, (err, choosenuser) => {
                        if (!err && choosenuser) {
                            newAdminUser = new User(fields);
                            if (fields.differentpassword) {
                                bcrypt.genSalt(SALT_I, function (err, salt) {
                                    if (err) return res.json({ success: false, err, message: 'ERROR, PLEASE TRY AGAIN' });
                                    bcrypt.hash(fields.password, salt, function (err, hash) {
                                        if (err) return res.json({ success: false, err, message: 'ERROR, PLEASE TRY AGAIN' });
                                        let newpassword = hash;
                                        newAdminUser.password = newpassword;
                                        newAdminUser.images = result;
                                        newAdminUser.images = imagesToRemoved ?
                                            newAdminUser.images.filter((data) => {
                                                return !imagesToRemoved.includes(data.public_id)
                                            })
                                            : newAdminUser.images;

                                        newAdminUser.isAuth = fields.isauth === "yes" ? true : false;
                                        newAdminUser.isActive = fields.isactive === "yes" ? true : false;
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

                                        newAdminUser = deleteKey(newAdminUser, '_id');
                                        if (newAdminUser.images.length > 0) {
                                            User.findOneAndUpdate(
                                                { _id: fields._id },
                                                {
                                                    $set: newAdminUser
                                                },
                                                { new: true },
                                                (err, doc) => {
                                                    if (err) return res.json({ success: false, err, message: "UPDATE USER FAILED" });
                                                    return res.status(200).json({
                                                        success: true,
                                                        doc
                                                    })
                                                }
                                            );
                                        } else {
                                            newAdminUser = deleteKey(newAdminUser, 'images');
                                            User.findOneAndUpdate(
                                                { _id: fields._id },
                                                {
                                                    $set: newAdminUser
                                                },
                                                { new: true },
                                                (err, doc) => {
                                                    if (err) return res.json({ success: false, err, message: "UPDATE USER FAILED" });
                                                    return res.status(200).json({
                                                        success: true,
                                                        doc
                                                    })
                                                }
                                            );
                                        }
                                    })
                                })
                            } else {
                                newAdminUser.images = result;
                                newAdminUser.images = imagesToRemoved ?
                                    newAdminUser.images.filter((data) => {
                                        return !imagesToRemoved.includes(data.public_id)
                                    })
                                    : newAdminUser.images;
                                newAdminUser.isAuth = fields.isauth === "yes" ? true : false;
                                newAdminUser.isActive = fields.isactive === "yes" ? true : false;
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

                                newAdminUser = deleteKey(newAdminUser, '_id');
                                if (newAdminUser.images.length > 0) {
                                    User.findOneAndUpdate(
                                        { _id: fields._id },
                                        {
                                            $set: newAdminUser
                                        },
                                        { new: true },
                                        (err, doc) => {
                                            if (err) return res.json({ success: false, err, message: "UPDATE USER FAILED" });
                                            return res.status(200).json({
                                                success: true,
                                                doc
                                            })
                                        }
                                    );
                                } else {
                                    newAdminUser = deleteKey(newAdminUser, 'images');
                                    User.findOneAndUpdate(
                                        { _id: fields._id },
                                        {
                                            $set: newAdminUser
                                        },
                                        { new: true },
                                        (err, doc) => {
                                            if (err) return res.json({ success: false, err, message: "UPDATE USER FAILED" });
                                            return res.status(200).json({
                                                success: true,
                                                doc
                                            })
                                        }
                                    );
                                }
                            }
                        }
                    })
                })
                .catch((err) => {
                    if (err) return res.json({ success: false, err });
                })
        }
    })
});

router.route('/login').post((req, res) => {

    User.findOne(
        { 'email': req.body.email }, (err, user) => {
            if (!user) return res.json({ success: false, message: 'EMAIL NOT FOUND !!' });
            if (user.isActive === true) {
                // check password
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.json({ success: false, message: 'WRONG PASSWORD' });

                    // generate a token
                    user.generateToken((err, user) => {
                        if (err) return res.json({ success: false, err, message: 'GENERATE TOKEN FAILED, PLEASE TRY AGAIN' });
                        res.cookie('lumisoft_token_auth', user.token).status(200).json({
                            success: true,
                            user
                        })
                    })
                })
            } else {
                return res.json({ success: false, message: 'ACCOUNT INACTIVE' });
            }
        })
});

router.route('/logout').get(auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({ success: false, err, message: 'LOGOUT FAILED, PLEASE TRY AGAIN' });
            return res.status(200).json({
                success: true
            })
        }
    )
})

module.exports = router;