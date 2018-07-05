const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uri = process.env.DB

mongoose.connect(uri);

let Project = new Schema({
    project_name: String,
    organization: String,
    created_on: String,
    repo: String,
    created_by: String
})

module.exports = mongoose.model('projects', Project)