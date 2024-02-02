const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance with connection details
const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'abc',
    host: 'localhost',
    port: 5432,
    database: 'learning',
    logging: true
});

// Authenticate the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized successfully');
});

db.users = require('./users')(sequelize, DataTypes);
db.posts = require('./post')(sequelize, DataTypes);

db.users.hasOne(db.posts, { foreignKey: 'user_id', as: 'postDetail' })
db.posts.belongsTo(db.users, { foreignKey: 'user_id' })

module.exports = db;
