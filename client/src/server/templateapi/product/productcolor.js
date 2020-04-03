const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Productcolor } = require('../../templatemodels/product/productcolor');
const { auth } = require('../../middleware/auth');

//======================================================================
//                            PRODUCT COLOR
//======================================================================

router.route('/addproductcolor').post(auth, (req, res) => {
    const productcolor = new Productcolor(req.body);

    productcolor.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getproductcolor').get((req, res) => {
    Productcolor.
        find({}, (err, productcolors) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                productcolors
            });
        })
})

router.route('/updateproductcolor').post(auth, (req, res) => {
    Productcolor.findOneAndUpdate(
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

router.route('/deleteproductcolor/:id').delete(auth, (req, res) => {
    Productcolor.findByIdAndRemove(req.params.id,
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