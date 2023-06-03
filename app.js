const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('647b6b8109e6c803bd85d093')
        .then((user) => {
            req.user = user
            next()
        })
        .catch((err) => {
            console.log(err)
        })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
    .connect('mongodb+srv://vakulio:bI8CAHnMlXlvJ1XY@node-learning.ey3k7eo.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: 'Vakulio',
                    email: 'vakulio@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        app.listen(3000, () => {
            console.log(`\x1b[1;34mStart on \u001B[33mhttp://localhost:3000/\u001B[0m`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
