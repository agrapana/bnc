const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100,
        default: ""
    },
    sku: {
        type: String,
        maxlength: 100,
        default: ""
    },
    description: {
        type: String,
        maxlength: 100000,
        default: ""
    },
    details: {
        type: String,
        maxlength: 100000,
        default: ""
    },
    price: {
        type: Number,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Productbrand'
    },
    color:{
        type: Schema.Types.ObjectId,
        ref: 'Productcolor'
    },
    size:{
        type: Schema.Types.ObjectId,
        ref: 'Productsize'
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Productcat'
    }],
    shipping: {
        type: Boolean,
        default: true
    },
    available: {
        type: Boolean,
        default: true
    },
    additional: {
        type: Array,
        default: []
    },
    videos: {
        type: Array,
        default: []
    },
    weight:{
        type: String,
        maxlength: 100,
        default: ""
    },
    dimension:{
        type: String,
        maxlength: 100,
        default: ""
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean,
        default: true
    },
    priceoptional:{
        type: Array,
        default: []
    },
    images: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };