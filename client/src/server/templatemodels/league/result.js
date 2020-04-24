const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    map: {
        type: String,
        maxlength: 100,
        default: ""
    },
    results:{
        type: Array,
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    images:{
        type: Array,
        default: []
    },
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

module.exports = { Result };