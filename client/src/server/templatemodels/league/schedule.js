const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = mongoose.Schema({
    currentserver: {
        type: Schema.Types.ObjectId,
        ref: 'Servers'
    },
    start: {
        type: String,
        default: ""
    },
    teamleft: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    teamright: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    results:[{
        type: Schema.Types.ObjectId,
        ref: 'Result'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Schedule };