const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)


const errorController = require('./controllers/error')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://vakulio:bI8CAHnMlXlvJ1XY@node-learning.ey3k7eo.mongodb.net/shop'

const app = express()
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'XXXXXXXXX',
    resave: false,
    saveUninitialized: false,
    store: store
}))


app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)

mongoose
    .connect(MONGODB_URI)
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
