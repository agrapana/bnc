const mongoose = require('mongoose');

const semifinalSchema = mongoose.Schema({
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

const Semifinal = mongoose.model('Semifinal', semifinalSchema);

module.exports = { Semifinal };