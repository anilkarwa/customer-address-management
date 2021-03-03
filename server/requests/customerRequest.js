
const { body, param, query } = require('express-validator')

const validate = (method) => {
    switch (method) {
        case 'addCustomer':
            return [
                body('firstName')
                    .exists().withMessage('fist name not provided'),
                body('lastName')
                    .exists().withMessage('last name not provided'),
                body('emailAddress')
                    .exists().withMessage('email address not provided'),
                body('phoneNumber')
                    .exists().withMessage('phone number not provided')
            ]
        case 'updateCustomer':
            return [
                body('id')
                    .exists().withMessage('customer id not provided'),
                body('firstName')
                    .exists().withMessage('fist name not provided'),
                body('lastName')
                    .exists().withMessage('last name not provided'),
                body('emailAddress')
                    .exists().withMessage('email address not provided'),
                body('phoneNumber')
                    .exists().withMessage('phone number not provided')
            ]
        case 'getCustomers':
            return [
                query('pageNumber')
                    .exists().withMessage('page number not provided'),
                query('pageSize')
                    .exists().withMessage('page size not provided'),
                query('status')
                    .exists().withMessage('status not provided')
            ]
        case 'getCustomerById':
            return [
                param('id')
                    .not().isEmpty().withMessage('customer id not provided'),
            ]

        case 'addAddress':
            return [
                body('addressLine1')
                    .exists().withMessage('address line 1 not provided'),
                body('addressLine2')
                    .exists().withMessage('address line 2 not provided'),
                body('city')
                    .exists().withMessage('city not provided'),
                body('state')
                    .exists().withMessage('state not provided'),
                body('country')
                    .exists().withMessage('country not provided'),
                body('zipCode')
                    .exists().withMessage('zip code not provided'),
                body('isPrimary')
                    .exists().withMessage('isPrimary not provided'),
                body('customerId')
                    .exists().withMessage('customer id not provided')
            ]

        case 'updateAddress':
            return [
                body('addressId')
                    .exists().withMessage('address id not provided'),
                body('addressLine1')
                    .exists().withMessage('address line 1 not provided'),
                body('addressLine2')
                    .exists().withMessage('address line 2 not provided'),
                body('city')
                    .exists().withMessage('city not provided'),
                body('state')
                    .exists().withMessage('state not provided'),
                body('country')
                    .exists().withMessage('country not provided'),
                body('zipCode')
                    .exists().withMessage('zip code not provided'),
                body('isPrimary')
                    .exists().withMessage('isPrimary not provided'),
                body('customerId')
                    .exists().withMessage('customer id not provided')
            ]

        case 'deleteAddress':
            return [
                param('id')
                    .not().isEmpty().withMessage('address id not provided'),
            ]
    }
}

module.exports = { validate }
