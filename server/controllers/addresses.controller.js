const message = require('../constants/server.messages')
const db = require("../models");
const { validationResult } = require('express-validator');
const Addresses = db.addresses;

module.exports = (app) => {

  app.addAddress = async (req, res) => {

    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(message.BAD_REQUEST).send({
          error: true,
          message: { errors: errors.array({ onlyFirstError: true }) }
        })
      }

      let { addressLine1, addressLine2, city, state, country, zipCode, isPirmary, customerId } = req.body;
      const address = new Addresses({
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
        isPirmary: isPirmary,
        customerId: customerId
      });

      if (isPirmary) {
        await address.updateMany({ isPirmary: true }, { "$set": { isPirmary: false } });
      }

      let newAddress = await address.save();

      return res.status(message.SUCCESS).send({
        error: false,
        message: message.ADDRESS_ADDED,
        data: newAddress
      })

    } catch (error) {
      return res.status(message.INTERNAL_ERROR).send({
        error: true,
        message: error.message
      })
    }
  }

  app.updateAddress = async (req, res) => {

    try{

        const errors = validationResult(req) 
        if (!errors.isEmpty()){
            return res.status(message.BAD_REQUEST).send({
                error: true,
                message: {errors: errors.array({onlyFirstError: true})}
            })
        }
        let data = { addressLine1, addressLine2, city, state, country, zipCode, isPirmary } = req.body;

        if (isPirmary) {
          await address.updateMany({ isPirmary: true }, { "$set": { isPirmary: false } });
        }

        let updatedAddress = await Addresses.findOneAndUpdate({ customerId: req.body.customerId }, data)

        return res.status(message.SUCCESS).send({
            error: false,
            message: message.ADDRESS_UPDATED,
            data: updatedAddress
        })

    }catch(error){
        return res.status(message.INTERNAL_ERROR).send({
            error: true,
            message: error.message
        })
    }
  }


  app.deleteDoctor = async (req, res) => {

    try{

        const errors = validationResult(req) 
        if (!errors.isEmpty()){
            return res.status(message.BAD_REQUEST).send({
                error: true,
                message: {errors: errors.array({onlyFirstError: true})}
            })
        }

        await Addresses.findByIdAndRemove(req.params.id);

        return res.status(message.SUCCESS).send({
          error: false,
          message: message.ADDRESS_DELETED,
          data: {}
      })

    }catch(error){
        return res.status(message.INTERNAL_ERROR).send({
            error: true,
            message: error.message
        })
    }
  }
}