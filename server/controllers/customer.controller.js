const message = require('../constants/server.messages')
const db = require("../models");
const { validationResult } = require('express-validator');
const Customer = db.customer;


module.exports = (app) => {

    app.addCustomer = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(message.BAD_REQUEST).send({
                    error: true,
                    message: { errors: errors.array({ onlyFirstError: true }) }
                })
            }

            let { firstName, lastName, emailAddress, phoneNumber } = req.body;
            const customer = new Customer({
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber
            });


            let newCustomer = await customer.save();

            return res.status(message.SUCCESS).send({
                error: false,
                message: message.CUSTOMER_ADDED,
                data: newCustomer
            })

        } catch (error) {
            return res.status(message.INTERNAL_ERROR).send({
                error: true,
                message: error.message
            })
        }
    }

    app.updateCustomer = async (req, res) => {

        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(message.BAD_REQUEST).send({
                    error: true,
                    message: { errors: errors.array({ onlyFirstError: true }) }
                })
            }

            let data = { firstName, lastName, emailAddress, phoneNumber } = req.body;
            let updatedCustomer = await Customer.findOneAndUpdate({ _id: req.body.id }, data)

            return res.status(message.SUCCESS).send({
                error: false,
                message: message.CUSTOMER_UPDATED,
                data: updatedCustomer
            })

        } catch (error) {
            return res.status(message.INTERNAL_ERROR).send({
                error: true,
                message: error.message
            })
        }
    }

    app.deleteCustomerById =  async(req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(message.BAD_REQUEST).send({
                    error: true,
                    message: { errors: errors.array({ onlyFirstError: true }) }
                })
            }

            await Customer.findOneAndUpdate({ _id: req.params.id },
                { deleted: true, deletedOn: new Date() })

            return res.status(message.SUCCESS).send({
                error: false,
                message: message.CUSTOMER_DELETED,
                data: {}
            })

        } catch (error) {
            return res.status(message.INTERNAL_ERROR).send({
                error: true,
                message: error.message
            })
        }
    }

    app.getCustomerById = async (req, res) => {

        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(message.BAD_REQUEST).send({
                    error: true,
                    message: { errors: errors.array({ onlyFirstError: true }) }
                })
            }

           // let customerDetails = await Customer.findById(req.params.id).exec();

            let customerDetails=  await Customer.aggregate([
                {$match: {_id: req.params.id}},
                {$lookup: {
                    from: 'addresses',
                    localField: '_id',
                    foreignField: 'customerId',
                    as: 'addresses'
                }}
            ]).exec();
            if (!customerDetails) {
                return res.status(message.INTERNAL_ERROR).send({
                    error: false,
                    message: message.CUSTOMER_NOT_FOUND,
                    data: {}
                })
            }

            return res.status(message.SUCCESS).send({
                error: false,
                message: message.DATA_FOUND,
                data: customerDetails
            })

        } catch (error) {
            return res.status(message.INTERNAL_ERROR).send({
                error: true,
                message: error.message
            })
        }
    }

    app.getAllCustomers = async (req, res) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(message.BAD_REQUEST).send({
                    error: true,
                    message: { errors: errors.array({ onlyFirstError: true }) }
                })
            }

            let { pageNumber, pageSize, status, keyword, details } = req.query;
            let limit = parseInt(pageSize);
            let skip = parseInt(pageSize * (pageNumber - 1));
            let search = keyword;
            let condition = {};

            condition = { deleted: { $ne: true }, status: status === 'true' ? true : false};


            if (search && search !== 'undefined' && search !== '') {
                condition['$or'] = [
                    { firstName: { '$regex': search, '$options': 'i' } },
                    { lastName: { '$regex': search, '$options': 'i' } },
                    { emailAddress: { '$regex': search, '$options': 'i' } },
                    { phoneNumber: { '$regex': search, '$options': 'i' } },
                ];
            }

            let aggregateOptions = [];
            aggregateOptions.push({ $match: condition });

            //get addresses if details flag in query is true
            if (details) {
                aggregateOptions.push({
                    $lookup: {
                        from: 'addresses',
                        localField: '_id',
                        foreignField: 'customerId',
                        as: 'addresses'
                    }
                })
            }

            //add count and sorting
            aggregateOptions.push({
                '$facet': {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: skip }, { $limit: limit }] // add projection here wish you re-shape the docs
                }
            })

            let customerRecords=  await Customer.aggregate(aggregateOptions).exec();

            return res.status(message.SUCCESS).send({
                error: false,
                message: message.DATA_FOUND,
                data: customerRecords
            })
            

        } catch (error) {
            return res.status(message.INTERNAL_ERROR).send({
                error: true,
                message: error.message
            })
        }
    }

}

