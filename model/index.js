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

db.tags = require('./tags')(sequelize, DataTypes)
db.post_tag = require('./post_tag')(sequelize, DataTypes)

// db.users.hasOne(db.posts, { foreignKey: 'user_id', as: 'postDetail' })

//oneToOne 
db.users.hasMany(db.posts, { foreignKey: 'user_id', as: 'postDetail' })
db.posts.belongsTo(db.users, { foreignKey: 'user_id', as: 'userInfo' })

// oneToMany
db.posts.belongsToMany(db.tags, { through: 'post_tag' })
db.tags.belongsToMany(db.posts, { through: 'post_tag' })


module.exports = db;
