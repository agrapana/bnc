const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    subname: {
        type: String,
        maxlength: 100,
        default: ""
    },
    linktitle: {
        type: String,
        maxlength: 100,
        default: ""
    },
    linkto: {
        type: String,
        maxlength: 100,
        default: ""
    },
    images: {
        type: Array,
        default: []
    },
    videos: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = { Slider };