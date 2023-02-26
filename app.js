const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user
        next()
    }).catch((err) => { console.log(err) })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

// for create tables in DB
sequelize
    // .sync({force: true})
    // update tables in DB
    .sync()
    .then(() => { return User.findByPk(1) })
    .then(user => {
        if (!user) {
            return User.create({ name: "Vakul", email: "test@test.com" })
        }
        return user
    })
    .then(user => {
        return user.createCart()

    }).then(cart => {
        app.listen(3000, () => {
            console.log(`\x1b[1;34mStart on \u001B[33mhttp://localhost:3000/\u001B[0m`)
        });
    })
    .catch(err => { console.log(err) });


