const express = require('express')
const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Project = require('../models/Project')
const bodyParser = require('body-parser')
const mailer = require('../services/mailer')
const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newTicket',(req,res) => {
    let info = req.body
    let now = new Date()

    new Ticket ({
        issue_title: info.title.trim(),
        issue_text: info.text.trim(),
        created_on: now,
        updated_on: now,
        created_by: info.createdBy,
        assigned_to: info.assignedTo,
        assigned_by: info.createdBy,
        open: info.open,
        status_text: info.statusText.trim(),
        project_name: info.projectName.trim()
    }).save().then(() => {
        User.findOne({username: info.assignedTo},(err,response) => {
            console.log(response.email)
            mailer.ticketUpdate(response.email, info.assignedTo, info.title)
            return res.send('saved')
        })
    })
})

router.post('/newProject',(req,res) => {
    let info = req.body
    let now = new Date()

    new Project ({
        project_name: info.projectName.trim(),
        organization: info.organization.trim(),
        created_on: new Date(),
        repo: info.repo.trim(),
        created_by: info.createdBy.trim(),
        users: info.users
    }).save().then(() => {
        return res.send('saved')
    })
})

router.post('/newTeammate', (req,res) => {

    Project.findOne({project_name: req.body.project}, (err,response) => {
        for(x of response.users) {
            if (x == req.body.user.trim()) {
                return res.send({status: "User is already on team"})
            }
        }

        User.findOne({username: req.body.user.trim()}, (err,response) => {
            if (response == undefined) {
                return res.send({status: "Username does not match an existing user. Please try again."})
            }

            Project.findOneAndUpdate({project_name: req.body.project}, {$push: {users: req.body.user.trim()}}, (err,response2) => {
                if(err) {
                    return res.send({status: "Error. User not added. Please try again"})
                }
                else {
                    return res.send({status: "User Added"})
                }
            })
        })
    })
})

router.post('/getTeammates', (req,res) => {
    Project.findOne({project_name: req.body.project},(err,response) => {
        return res.send({users: response.users})
    })
})

module.exports = router