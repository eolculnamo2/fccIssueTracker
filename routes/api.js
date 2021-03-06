const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const User = require('../models/User')
const mailer = require('../services/mailer')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/issues/apitestproject',(req,res) => {
    Ticket.find({}, (err,result)=>{
        return res.header("Content-Type",'application/json')
                  .send(JSON.stringify(result, null, 3))
    })
})

router.get('/issues/all-projects',(req,res) => {
    Project.find({}, (err,result)=>{
        return res.header("Content-Type",'application/json')
                  .send(JSON.stringify(result, null, 3))
    })
})

router.post('/issues/get-projects',(req,res) => {
    Project.findOne({project_name: req.body.projectName},(err,response) => {
        res.send(response)
    })
})

router.post('/issues/submit-changes',(req,res) => {
    Ticket.findOneAndUpdate({_id: req.body.id},
    {$set: 
            {
                'assigned_to': req.body.assignedTo,
                'assigned_by': req.body.assignedBy,
                'open': req.body.open,
                'status_text':req.body.newStatus,
                'updated_on': new Date()
            }
    },
    (err, response) => {
        if(err) {
            console.log("Submit Changes Error")
        }
        else {
            User.findOne({username: req.body.assignedTo},(err,response2) => {
                mailer.ticketUpdate(response2.email, req.body.assignedTo, response.issue_title)
                return res.send('saved')
            })
        }
    })
})

router.post('/issues/change-ticket-status',(req,res) => {
    let target = req.body.target
    let update = req.body.newValue
    let now = new Date()

    switch(target){
        case 'open':
            Ticket.findOneAndUpdate({_id: req.body['_id']},
                {$set: {'open' : update, 'updated_on': now}},
                (err,result) => {
                    return res.send(result)
            })
        break
        case 'issue_title':
            Ticket.findOneAndUpdate({_id: req.body['_id']},
                {$set: {'issue_title' : update, 'updated_on': now}},
                (err,result) => {
                    return res.send(result)
            })
        break
        case 'issue_text':
            Ticket.findOneAndUpdate({_id: req.body['_id']},
                {$set: {'issue_text' : update, 'updated_on': now}},
                (err,result) => {
                    return res.send(result)
            })
        break
        case 'assigned_to':
            Ticket.findOneAndUpdate({_id: req.body['_id']},
                {$set: {'assigned_to' : update, 'updated_on': now}},
                (err,result) => {
                    return res.send(result)
            })
        break
        case 'status_text':
            Ticket.findOneAndUpdate({_id: req.body['_id']},
                {$set: {'status_text': update, 'updated_on': now}},
                (err,result) => {
                    return res.send(result)
            })
        break
    }
})

router.post('/issues/delete-ticket',(req,res) => {
    Ticket.findByIdAndRemove(req.body.id, (err,response) => {
        res.send('deleted')
    })
})

module.exports = router