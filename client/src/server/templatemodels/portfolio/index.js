const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength: 100,
        default: ""
    },
    subname:{
        type: String,
        maxlength: 100,
        default: ""
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images:{
        type: Array,
        default: []
    },
    additional:{
        type: Array,
        default: []
    },
    videos:{
        type: Array,
        default: []
    },
},{timestamps:true});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { Portfolio };