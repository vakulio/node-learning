const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')
// const open = require('open');
const path = require('path')

// open('http://localhost:3000');

const app = express()

app.engine('hbs', expressHbs())
app.set('view engine', 'hbs')  // расширение файлов
app.set('views', 'views')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { docTitle: 'Page Not Found' });
})


app.listen(3000)



