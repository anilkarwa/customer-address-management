const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        emailAddress: {
            type: String,
            unique: true
        },
        phoneNumber: {
            type: String,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedOn: {
            type: Date
        },
        addedOn: {
            type: Date,
            default: new Date()
        },
        updatedOn: {
            type: Date,
            default: new Date()
        }
    })
);

module.exports = Customer;