
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// e role par defaut ykoun user et si l'admin y7eb ybadlek admin wa9tha tetbadel
const UserModel = new Schema(
  {
    firstname: "string",
    lastname: "string",
    email: {
      type: "string",
      trim: true, /*trim enléve les espaces */
      unique: true /* si on mettre le méme email c impo */
    },
    password: "string",
    role: "string",

  }, { timestamps: true, versionKey: false })
module.exports = mongoose.model('users', UserModel)











