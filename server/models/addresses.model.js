const mongoose = require("mongoose");

const Addresses = mongoose.model(
    "Addresses",
    new mongoose.Schema({
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        addressLine1: {
            type: String
        },
        addressLine1: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zipCode: {
            type: String
        },
        isPrimary: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
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

module.exports = Addresses;