const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

router.get('/new-ticket',(req,res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

router.get('/new-project',(req,res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

router.get('/view-tickets',(req,res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

router.get('/show-tickets/:str',(req,res) => {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

module.exports = router