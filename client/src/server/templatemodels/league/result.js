const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = mongoose.Schema({
    map: {
        type: String,
        maxlength: 100,
        default: ""
    },
    team1: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    team2: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
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