const express = require('express')
const router = express.Router()
const path = require('path')

let routes = ['/',
             '/new-ticket',
             '/new-project',
             '/view-tickets',
             '/login',
             '/show-tickets/:str']

routes.forEach( x => {
    router.get(x,(req,res) => {
        res.sendFile(path.join(__dirname,'..','/public/index.html'))
    })
})


module.exports = router