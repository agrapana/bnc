const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Productsize } = require('../../templatemodels/product/productsize');
const { auth } = require('../../middleware/auth');

//======================================================================
//                            PRODUCT SIZE
//======================================================================

router.route('/addproductsize').post(auth, (req, res) => {
    const productsize = new Productsize(req.body);

    productsize.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getproductsize').get((req, res) => {
    Productsize.
        find({}, (err, productsizes) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                productsizes
            });
        })
})

router.route('/updateproductsize').post(auth, (req, res) => {
    Productsize.findOneAndUpdate(
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

router.route('/deleteproductsize/:id').delete(auth, (req, res) => {
    Productsize.findByIdAndRemove(req.params.id,
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