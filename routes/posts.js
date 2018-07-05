const express = require('express')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newTicket',(req,res) => {
    let info = req.body
    let now = new Date()

    new Ticket ({
        issue_title: info.title,
        issue_text: info.text,
        created_on: now,
        updated_on: now,
        created_by: info.createdBy,
        assigned_to: info.assignedTo,
        open: info.open,
        status_text: info.statusText,
        project_name: info.projectName
    }).save().then(() => {
        return res.send('saved')
    })
})

router.post('/newProject',(req,res) => {
    let info = req.body
    let now = new Date()

    new Project ({
        project_name: info.projectName,
        organization: info.organization,
        created_on: new Date(),
        repo: info.repo,
        created_by: info.createdBy,
        users: info.users
    }).save().then(() => {
        return res.send('saved')
    })
})

module.exports = router