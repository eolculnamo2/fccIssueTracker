const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Ticket = require('../models/Ticket')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// /api/issue/apitestproject

router.get('/issues/apitestproject',(req,res) => {
    Ticket.find({}, (err,result)=>{
        return res.send(result)
    })
})

module.exports = router