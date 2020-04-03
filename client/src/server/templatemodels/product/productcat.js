const mongoose = require('mongoose');

const productcatSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
},{timestamps:true});

const Productcat = mongoose.model('Productcat', productcatSchema);

module.exports = { Productcat }