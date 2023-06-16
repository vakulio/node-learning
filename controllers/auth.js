const User = require('../models/user')

exports.getRegister = (req, res, next) => {}


exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: true
    })
}


exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true
    User.findById('647b6b8109e6c803bd85d093')
    .then((user) => {
        req.session.user = user
        next()
    })
    .catch((err) => {
        console.log(err)
    })
    res.redirect('/')
}
