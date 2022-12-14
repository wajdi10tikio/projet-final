const UserModel = require("../models/users.models")
const bcrypt = require("bcryptjs")
const ValidateRegister = require("../validation/Register")
const ValidateLogin = require("../validation/Login")
const jwt = require("jsonwebtoken")
exports.Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body)
  try {

    if (!isValid /*si on as des erreurs */) {
      res.status(404).json(errors)
    } else {
      // si email exist 9oli user exist sinon create new user
      UserModel.findOne({ email: req.body.email })
        .then(async (exist) => {
          if (exist) {
            errors.email = "user exist"
            res.status(404).json(errors)
          } else {
            // traitement bcrypt ça fenctionne dans l creation de user
            const hash = bcrypt.hashSync(req.body.password, 10)//hashed password
            req.body.password = hash
            req.body.role = "USER"
            await UserModel.create(req.body)
            res.status(200).json({ message: 'add success' })
          }
        })
    }

  } catch (error) {
    res.status(404).json(error.message)
  }

};

// login
// principe login . si user existe nous faison la comparaison de motpasse et nous retourne un token sinon notfound
exports.Login = async (req, res) => {
  // ver user exist or not exist
  const { errors, isValid } = ValidateLogin(req.body)
  try {
    //si not exist return erros 404
    if (!isValid) {
      res.status(404).json(errors)
    } else {
      // si exist return user
      UserModel.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            errors.email = "not found user"
            res.status(404).json(errors)
          } else {
            //step 2 (compare motpass)
            bcrypt.compare(req.body.password, user.password)
              .then(isMatch => {
                if (!isMatch) {
                  errors.password = "incorrect password"
                  res.status(404).json(errors)
                } else {
                  const token = jwt.sign({
                    id: user._id,
                    firstname: user.firstname,
                    lasttname: user.lasttname,
                    email: user.email,
                    role: user.role
                  }, 'tikio', { expiresIn: '1h' });

                  return res.status(200).json({
                    message: "success",
                    token: "Bearer " + token
                  })
                }
              })

          }
        })
    }
  } catch (error) {
    res.status(404).json(error.message)
  }
}


exports.Test = (req, res) => {

  res.send("welcome user")
}

exports.Admin = (req, res) => {

  res.send("welcome admin")
}