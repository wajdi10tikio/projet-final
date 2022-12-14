const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require("helmet")
const routerUsers = require("./routes/users")
const passport = require("passport")
const app = express()


app.use(express.json())

app.use(helmet());

app.use(morgan('tiny'))

// routes

app.use('/api', routerUsers)

// passport
app.use(passport.initialize())
require('./security/Passport')(passport)


// connect to db

mongoose.connect("mongodb://localhost:27017/multi-users", {
  useNewUrlParser: true
})
  .then(() => console.log("db connected"))
  .catch(err => console.log(err.message))




app.listen(4600, console.log("this app working in port 4600"))
