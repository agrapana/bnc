const mongoose = require('mongoose');

const productbrandSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
}, { timestamps: true });

const Productbrand = mongoose.model('Productbrand', productbrandSchema);

module.exports = { Productbrand }