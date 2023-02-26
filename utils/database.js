const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', '14226', { dialect: 'mysql', host: 'localhost' })


module.exports = sequelize;