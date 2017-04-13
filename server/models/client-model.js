const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// CLIENTS

const ClientSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    company: {
        type: String,
        default: "",
    },
    email: {
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
    projects: {
        type: Array,
        default: []
    },
    userId: {
        type: String,
    },
    dateCreated: {type: Date},
    dateModified: {type: Date}
});

ClientSchema.methods.apiRepr = function () {
    return {
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email || '',
        phone: this.phone || '',
        address: this.address || '',
        projects: this.projects || [],
        clientId: this._id || '',
        dateCreated: this.dateCreated || '',
        dateModified: this.dateModified || '',
        userId: this.userId || '',
    };
}

const Client = mongoose.model('Client', ClientSchema);

module.exports = { Client };