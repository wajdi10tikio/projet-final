const profileModel = require("../models/profiles.models")
const validateProfile = require("../validation/Profile")
exports.AddProfile = async (req, res) => {
  const { errors, isValid } = validateProfile(req.body)
  try {
    if (!isValid) {
      res.status(404).json(errors)
    } else {
      // ken fama profile ahwka sinon na3mlou profile jdid
      profileModel.findOne({ user: req.user.id })
        .then(async (profile) => {
          if (!profile) {
            req.body.user = req.user.id
            await profileModel.create(req.body)
            res.status(200).json({ message: "success" })
          } else {
            await profileModel.findByIdAndUpdate(
              { _id: profile._id },
              req.body,
              { new: true }
            ).then(result => {
              res.status(200).json(result)
            })
          }
        })
    }
  } catch (error) {
    res.status(404).json(error.message)

  }
}


// find all profiles
exports.FindAllProfile = async (req, res) => {
  try {
    const data = await profileModel.find().populate('user', ["name", "email", "role"])
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}


// find one profile
exports.FindSingleProfile = async (req, res) => {
  try {
    const data = await profileModel.findOne({ user: req.user.id }).populate('user', ["name", "email", "role"])
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}

// delete profile
exports.DeleteProfile = async (req, res) => {
  try {
    const data = await profileModel.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ message: "deleted" })

  } catch (error) {
    res.status(404).json(error.message)
  }
}
