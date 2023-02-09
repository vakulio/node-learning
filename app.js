const express = require('express')
const bodyParser = require('body-parser')

// const open = require('open');
const path = require('path')

// open('http://localhost:3000');

const app = express()


app.set('view engine', 'ejs')  // расширение файлов
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



