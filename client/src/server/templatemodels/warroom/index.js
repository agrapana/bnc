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
    start: {
        type: String,
        default: ""
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    isProcessing: {
        type: Boolean,
        default: false
    },
    isClosed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Warroom = mongoose.model('Warroom', warroomSchema);

module.exports = { Warroom };