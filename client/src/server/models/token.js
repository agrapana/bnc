const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = mongoose.Schema({
    uid:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200,
        required: true
    }
},{timestamps:true});

const Token = mongoose.model('Token', tokenSchema);

module.exports = { Token };