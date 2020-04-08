const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warroomSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    currentserver: {
        type: Schema.Types.ObjectId,
        ref: 'Servers'
    },
    currentadmin: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    status: {
        type: String,
        maxlength: 100,
        default: ""
    }
}, { timestamps: true });

const Warroom = mongoose.model('Warroom', warroomSchema);

module.exports = { Warroom };