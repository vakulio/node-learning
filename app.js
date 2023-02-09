const express = require('express')
const bodyParser = require('body-parser')

// const open = require('open');
const path = require('path')

// open('http://localhost:3000');

const app = express()


app.set('view engine', 'ejs')  // расширение файлов
app.set('views', 'views')

const ErrController = require("./controllers/error")
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(ErrController.catchErr)


app.listen(3000)



