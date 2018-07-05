const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const uri = process.env.DB

mongoose.connect(uri)

mongoose.connection.once('open',()=>{
    console.log("Connected to Mongo via Mongoose")
    }).on('error',(err)=>{
      console.log("Connection Error: " + err)
    })

var User = new Schema({
    username: String,
    password: String,
    email: String,
    projects: Array
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User)