const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');

// USERS

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    templates: {
        type: Array,
        default: []
    },
    timerStart: {
        type: Number,
        default: 0
    },
    timerRunning: {
        type: Boolean,
        //default: false
    },
    dateCreated: {type: Date},
    dateModified: {type: Date}
});

UserSchema.methods.apiRepr = function () {
    return {
        userName: this.userName || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email || '',
        phone: this.phone || '',
        address: this.address || '',
        templates: this.templates || [],
        timerStart: this.timerStart || 0,
        timerRunning: this.timerRunning || false,
        dateCreated: this.dateCreated || '',
        dateModified: this.dateModified || '',
        userId: this._id || '',
    };
}

UserSchema.methods.validatePassword = function (password) {
    return bcrypt
        .compare(password, this.hashedPassword)
        .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return { hash, salt };
}


const User = mongoose.model('User', UserSchema);

module.exports = { User };