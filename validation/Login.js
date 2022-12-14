const isEmpty = require("./isEmpty")
const validator = require("validator")

// login howa bidou registre juste nfas5ou champs name w mta3 l confirm

module.exports = function validateLogin(data) {
  let errors = {};


  data.firstname = !isEmpty(data.firstname) ? data.firstname : ""
  data.lastname = !isEmpty(data.lastname) ? data.lastname : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.confirm = !isEmpty(data.confirm) ? data.confirm : ""


  // validation email
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email"
  }


  // required email
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email"
  }

  // required password
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}