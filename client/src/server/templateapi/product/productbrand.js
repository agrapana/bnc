const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Productbrand } = require('../../templatemodels/product/productbrand');
const { auth } = require('../../middleware/auth');

//======================================================================
//                            PRODUCT BRAND
//======================================================================

router.route('/addproductbrand').post(auth, (req, res) => {
    const productbrand = new Productbrand(req.body);

    productbrand.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getproductbrand').get((req, res) => {
    Productbrand.
        find({}, (err, productbrands) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                productbrands
            });
        })
})

router.route('/updateproductbrand').post(auth, (req, res) => {
    Productbrand.findOneAndUpdate(
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

router.route('/deleteproductbrand/:id').delete(auth, (req, res) => {
    Productbrand.findByIdAndRemove(req.params.id,
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