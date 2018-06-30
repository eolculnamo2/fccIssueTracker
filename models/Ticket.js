const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uri = process.env.DB

mongoose.connect(uri);

mongoose.connection.once('open',()=>{
    console.log("Connected to Mongo via Mongoose")
    }).on('error',(err)=>{
      console.log("Connection Error: " + err)
    });

let Ticket = new Schema({
    id: Number,
    issue_title: String,
    issue_text: String,
    created_on: String,
    updated_on: String,
    created_by: String,
    assigned_to: String,
    open: Boolean,
    status_text: String
})

module.exports = mongoose.model('tickets', Ticket)