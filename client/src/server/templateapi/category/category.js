const router = require('express').Router();
//==================================================================
//                             MODELS
//==================================================================
const { Category } = require('../../templatemodels/portfolio/category');
const { auth } = require('../../middleware/auth');

//======================================================================
//                              CATEGORY
//======================================================================

router.route('/addcategory').post(auth, (req, res) => {
    const category = new Category(req.body);

    category.save((err, doc) => {
        if (err) return res.json({ success: false, err, message: "ADD FAILED" });
        res.status(200).json({
            success: true,
            doc
        })
    })
})

router.route('/getcategory').get((req, res) => {
    Category.
        find({}, (err, categories) => {
            if (err) return res.json({ success: false, err, message: "GET DATA FAILED" });
            res.status(200).json({
                success: true,
                categories
            });
        })
})

router.route('/updatecategory').post(auth, (req, res) => {
    Category.findOneAndUpdate(
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

router.route('/deletecategory/:id').delete(auth, (req, res) => {
    Category.findByIdAndRemove(req.params.id,
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