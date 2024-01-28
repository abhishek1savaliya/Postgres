const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance with connection details
const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'abc',
    host: 'localhost',
    port: 5432,
    database: 'learning',
    logging: false
});

// Authenticate the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Define a 'db' object to store Sequelize and models
const db = {};

// Store Sequelize and sequelize instance in the 'db' object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize, DataTypes);

db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
});

module.exports = db;
