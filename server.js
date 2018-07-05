require('dotenv').config();
const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const app = express()

app.use(helmet())

const pages = require('./routes/pages')
const posts = require('./routes/posts')
const api = require('./routes/api')
const authenticate = require('./services/passportMain')

app.use(session({ secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60*60*1000, secure: false, httpOnly: false }
    }))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('assets/dist'))
app.use('/', pages)
app.use('/posts', posts)
app.use('/api', api)
app.use('/authenticate', authenticate)

app.listen(3000,() => {
    console.log("Server ON")
})