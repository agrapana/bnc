const mongoose = require('mongoose');

const productcolorSchema = mongoose.Schema({
    name: {
        type: String,
        unique: 1,
        maxlength: 100
    }
}, { timestamps: true });

const Productcolor = mongoose.model('Productcolor', productcolorSchema);

module.exports = { Productcolor };