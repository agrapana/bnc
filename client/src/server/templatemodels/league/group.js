const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };