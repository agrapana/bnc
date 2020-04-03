const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    subname:{
        type: String,
        maxlength: 100,
        default: ""
    },
    images:{
        type: Array,
        default: []
    },
    videos:{
        type: Array,
        default: []
    },
},{timestamps:true});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = { Gallery };