const express = require('express')
const { Register, Login, Test, Admin } = require('../controllers/users.controllers')
const router = express.Router()
const passport = require("passport")
const { ROLES, inRole } = require('../security/RoleMiddleware')
const { AddProfile, FindAllProfile, FindSingleProfile, DeleteProfile } = require('../controllers/Profiles.controllers')

// add 
router.post('/register', Register)

// login
router.post('/login', Login)


// profile route

// 1) add new profile
router.post('/profiles', passport.authenticate('jwt', { session: false }), AddProfile)


//2) get all profiles
router.get('/profiles', passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  FindAllProfile)


/* get one profiles */
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile);


//4) delete profile
router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile)







module.exports = router