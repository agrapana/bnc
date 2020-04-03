const mongoose = require('mongoose');

const productsizeSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
}, { timestamps: true });

const Productsize = mongoose.model('Productsize', productsizeSchema);

module.exports = { Productsize }