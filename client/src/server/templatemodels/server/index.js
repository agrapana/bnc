const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    subname: {
        type: String,
        maxlength: 100,
        default: ""
    },
    ipaddress: {
        type: String,
        maxlength: 100,
        default: ""
    },
    gotv: {
        type: String,
        maxlength: 100,
        default: ""
    }
}, { timestamps: true });

const Servers = mongoose.model('Servers', serverSchema);

module.exports = { Servers };