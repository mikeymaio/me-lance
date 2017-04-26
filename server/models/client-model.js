const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// INVOICES

const TaskSchema = mongoose.Schema({
    description: {
        type: String
    },
    hoursSpent: {
        type: Number
    },
    date: {
        type: Date
    }
})

const InvoiceSchema = mongoose.Schema({
    invoiceNo: {
        type: Number
    },
    billingPeriodStart: {
        type: Date
    },
    billingPeriodEnd: {
        type: Date
    },
    tax: {
        type: Number
    },
    tasks: [TaskSchema],
})

// PROJECTS

const ProjectSchema = mongoose.Schema({
    clientName: {
        type: String,
        default: ""
    },
    projectName: {
        type: String,
        default: ""
    },
    rate: {
        type: Number,
        default: 0,
    },
    ratePer: {
        type: String,
        default: ""
    },
    budget: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
    totalTimeSpent: {
        type: Number,
    },
    timeSpentThisBill: {
        type: Number,
    },
    billingCycle: {
        type: String,
    },
    notes: {
        type: String,
    },
    invoices: [InvoiceSchema],
    template: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    clientId: {
        type: String,
    },
    userId: {
        type: String,
    },
    dateCreated: {type: Date},
    dateModified: {type: Date}
});

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
    // projects: {
    //     type: Array,
    //     // default: [ProjectSchema]
    // },
    projects: [ProjectSchema],
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
        company: this.company || '',
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