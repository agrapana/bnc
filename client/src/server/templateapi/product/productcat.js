const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Productcat } = require('../../templatemodels/product/productcat');
const { auth } = require('../../middleware/auth');

//======================================================================
//                            PRODUCT CATEGORY
//======================================================================

router.route('/addproductcat').post(auth, (req, res) => {
    const productcat = new Productcat(req.body);

    productcat.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getproductcat').get((req, res) => {
    Productcat.
        find({}, (err, productcats) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                productcats
            });
        })
})

router.route('/updateproductcat').post(auth, (req, res) => {
    Productcat.findOneAndUpdate(
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

router.route('/deleteproductcat/:id').delete(auth, (req, res) => {
    Productcat.findByIdAndRemove(req.params.id,
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