const mongoose = require('mongoose');

const finalSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    teamleft: {
        type: Array,
        default: []
    },
    teamright: {
        type: Array,
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Final = mongoose.model('Final', finalSchema);

module.exports = { Final };