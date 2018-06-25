const express = require('express')
const app = express()

const pages = require('./routes/pages')
const posts = require('./routes/posts')

app.use(express.static('assets/dist'))
app.use('/', pages)
app.use('/posts',posts)

app.listen(3000,()=>{
    console.log("Server ON")
})