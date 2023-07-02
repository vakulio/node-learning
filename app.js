const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const errorController = require('./controllers/error')
const User = require('./models/user')
const multer = require('multer')
const { createHash } = require('node:crypto')

const MONGODB_URI = 'mongodb+srv://vakulio:bI8CAHnMlXlvJ1XY@node-learning.ey3k7eo.mongodb.net/shop'
const app = express()
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions'
})
const csrfProtection = csrf()

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, createHash('sha256').digest('hex') + '-' + file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store
	})
)
app.use(csrfProtection)
app.use(flash())

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn
	res.locals.csrfToken = req.csrfToken()
	next()
})

app.use((req, res, next) => {
	if (!req.session.user) {
		return next()
	}
	User.findById(req.session.user._id)
		.then((user) => {
			if (!user) {
				return next()
			}
			req.user = user
			next()
		})
		.catch((err) => {
			throw new Error(err)
		})
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use('/500', errorController.get500)
app.use(errorController.get404)

app.use((error, req, res, next) => {
	res.redirect('/500')
})

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		app.listen(3000, () => {
			console.log(`\x1b[1;34mStart on \u001B[33mhttp://localhost:3000/\u001B[0m`)
		})
	})
	.catch((err) => {
		throw new Error(err)
	})
