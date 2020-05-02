const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    currentadmin: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    schedule: [{
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }],
    group: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    semifinal: [{
        type: Schema.Types.ObjectId,
        ref: 'Semifinal'
    }],
    final: [{
        type: Schema.Types.ObjectId,
        ref: 'Final'
    }],
    first: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    second: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    third: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    historyteams: {
        type: Array,
        default: []
    },
    historyschedule: {
        type: Array,
        default: []
    },
    historygroup: {
        type: Array,
        default: []
    },
    historysemifinal: {
        type: Array,
        default: []
    },
    historyfinal: {
        type: Array,
        default: []
    },
    accountnumber: {
        type: String,
        default: ""
    },
    accountname: {
        type: String,
        default: ""
    },
    bank: {
        type: String,
        default: ""
    },
    amount: {
        type: String,
        default: ""
    },
    info: {
        type: String,
        default: ""
    },
    start: {
        type: String,
        default: ""
    },
    end: {
        type: String,
        default: ""
    },
    rules: {
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

const League = mongoose.model('League', leagueSchema);

module.exports = { League };