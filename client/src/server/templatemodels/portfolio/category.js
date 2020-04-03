const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100,
        default: ""
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };