require('dotenv').config();
const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(helmet())

const pages = require('./routes/pages')
const posts = require('./routes/posts')
const api = require('./routes/api')

app.use(express.static('assets/dist'))
app.use('/', pages)
app.use('/posts', posts)
app.use('/api', api)

app.listen(3000,()=>{
    console.log("Server ON")
})