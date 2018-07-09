const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const Strategy = require('passport-local').Strategy
const mailer = require('./mailer')
//models
const User = require('../models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Register New User
router.post('/register', (req, res) => {
  if(req.body.password === req.body.confirmPassword){
    User.register(new User({
                             username : req.body.username.trim(),
                             email: req.body.email.trim(),
                             projects: [],
                             }), req.body.password.trim(), (err, account) => {
        if (err) {
            console.log(err.message)
            res.send(err.message)
        }
        else{
        passport.authenticate('local')(req, res, () => {
            mailer.welcomeUser(req.body.email, req.body.username)
            res.send({name: 'authenticated', user: req.user.username.trim()})
        })
        }
    })
  }
  else{
    res.send({name: "invalid-credentials"});
  }
})

//Login
router.post('/login', passport.authenticate('local'),(req, res) => {
  if (!req.user) {
    res.send({
      name: 'invalid-credentials'
    })
  }
  else if (req.user) {
      res.send({
        name: 'authenticated',
        user: req.user.username.trim()
      })
  }
})

//Logout
router.get('/logout',(req,res) => {
  req.logout();
  res.send({name: 'success'})
})

router.post('/checkLogin',(req,res) => {
  if(req.user){
    res.json({name: true, user: req.user.username.trim()})
  }
  else if(!req.user){
    res.json({name: false})
  }
})

module.exports = router