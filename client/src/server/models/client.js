const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

require('dotenv').config();

const clientSchema = mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        maxlength: 100,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    extension: {
        type: String,
        default: ""
    },
    carrier: {
        type: String,
        maxlength: 100,
        default: ""
    },
    pin: {
        type: String,
        default: ""
    },
    details: {
        type: Array,
        default: []
    },
    notifications: {
        type: Array,
        default: []
    },
    season: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: ""
    },
    steamid: {
        type: String,
        default: ""
    },
    steamname: {
        type: String,
        default: ""
    },
    steamavatar: {
        type: String,
        default: ""
    },
    headshotpercentage: {
        type: String,
        default: ""
    },
    totalkill: {
        type: String,
        default: ""
    },
    totaldeath: {
        type: String,
        default: ""
    },
    totalassist: {
        type: String,
        default: ""
    },
    totalmvp: {
        type: String,
        default: ""
    },
    totalpoint: {
        type: String,
        default: ""
    },
    totalkilldeath: {
        type: String,
        default: ""
    },
    totalscore: {
        type: String,
        default: ""
    },
    totaladr: {
        type: String,
        default: ""
    },
    registeredwarroom: {
        type: Schema.Types.ObjectId,
        ref: 'Warroom'
    },
    registeredteam: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isNamePin: {
        type: Boolean,
        default: false
    },
    isConnected: {
        type: Boolean,
        default: false
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
    masteradmin: {
        type: Number,
        default: 0
    },
    role: {
        type: Array,
        default: []
    },
    images:{
        type: Array,
        default: []
    },
    profile:{
        type: Array,
        default: []
    },
    sendcodeattempts:{
        type: Array,
        default: []
    },
    codeapproved:{
        type: Array,
        default: []
    },
    results:{
        type: Array,
        default: []
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
}, { timestamps: true });

clientSchema.pre('save', function (next) {
    var client = this;

    if (client.isModified('pin')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(client.pin, salt, function (err, hash) {
                if (err) return next(err);
                client.pin = hash;
                next();
            });
        })
    } else {
        next()
    }
})

clientSchema.methods.comparePIN = function (candidatePIN, cb) {
    bcrypt.compare(candidatePIN, this.pin, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

clientSchema.methods.generateToken = function (cb) {
    var client = this;
    var token = jwt.sign(client._id.toHexString(), process.env.SECRET)

    client.token = token;
    client.save(function (err, client) {
        if (err) return cb(err);
        cb(null, client);
    })
}

clientSchema.statics.findByToken = function (token, cb) {
    var client = this;

    jwt.verify(token, process.env.SECRET, function (err, decode) {
        client.findOne({ "_id": decode, "token": token }, function (err, client) {
            if (err) return cb(err);
            cb(null, client);
        })
    })
}

const Client = mongoose.model('Client', clientSchema);

module.exports = { Client }