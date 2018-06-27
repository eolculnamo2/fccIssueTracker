const express = require('express')
const Ticket = require('../models/Ticket')
const bodyParser = require('body-parser')
const moment = require('moment')
const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newTicket',(req,res) => {
    let info = req.body
    let now = moment().format('MMMM Do YYYY, h:mm:ss a')

    new Ticket ({
        issue_title: info.title,
        issue_text: info.text,
        created_on: now,
        updated_on: now,
        created_by: info.createdBy,
        assigned_to: info.assignedTo,
        open: info.open,
        status_text: info.statusText
    }).save().then(() => {
        return res.send('saved')
    })

})

module.exports = router