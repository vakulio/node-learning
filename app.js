const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
    console.log("Middleware2")
    res.send("<h1>Hello</h1>")
})


app.listen(3000)