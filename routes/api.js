const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Ticket = require('../models/Ticket')
const moment = require('moment')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/issues/apitestproject',(req,res) => {
    Ticket.find({}, (err,result)=>{
        return res.send(result)
    })
})

router.post('/issues/change-ticket-status',(req,res) => {
    let update = req.body.open === true ? false : true
    let now = moment().format('MMMM Do YYYY, h:mm:ss a')

     Ticket.findOneAndUpdate({_id: req.body['_id']},{$set: {open: update, 'updated_on': now}}, (err,result) => {
        return res.send(result)
    }) 
})

module.exports = router