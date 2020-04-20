const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };