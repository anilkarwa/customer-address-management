const validateAppointmentRequest = require("../requests/customerRequest");;

module.exports = function(app) {

  app.route("/api/v1/address")
    .post(validateAppointmentRequest.validate('addAddress'),app.addAddress)
    .put(validateAppointmentRequest.validate('updateAddress'),app.updateAddress)
    .delete(validateAppointmentRequest.validate('deleteAddress'),app.deleteDoctor)

};