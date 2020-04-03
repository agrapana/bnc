const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 255
    },
    private: {
        type: Boolean,
        default: false
    },
    pin: {
        type: String,
        trim: true,
        default: ""
    },
    icons: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        default: []
    },
    iconsexist: {
        type: Boolean,
        default: false
    },
    appsexist: {
        type: Boolean,
        default: false
    },
    imagesexist: {
        type: Boolean,
        default: false
    },
    publish: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };