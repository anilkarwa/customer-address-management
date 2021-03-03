const validateCustomerRequest = require("../requests/customerRequest");;

module.exports = function(app) {

  app.route("/api/v1/customer")
    .post(validateCustomerRequest.validate('addCustomer'), app.addCustomer)
    .put(validateCustomerRequest.validate('updateCustomer'), app.updateCustomer)
    .get(validateCustomerRequest.validate('getCustomers'), app.getAllCustomers)

  app.route("/api/v1/customer-by-id/:id")
    .get(validateCustomerRequest.validate('getCustomerById'), app.getCustomerById)
    .delete(validateCustomerRequest.validate('getCustomerById'), app.deleteCustomerById)
};