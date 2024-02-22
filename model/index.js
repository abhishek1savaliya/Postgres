const { Sequelize, DataTypes } = require('sequelize');
const video = require('./video');

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

db.users.addScope('checkGender', {
    where: {
        gender: 'male'
    }
});

db.users.addScope('includePost', {
    include: {
        model: db.posts,
        as: 'postDetail',
        attributes: ['name', 'content']
    }
});

//oneToOne 
db.users.hasMany(db.posts, { foreignKey: 'user_id', as: 'postDetail' })
db.posts.belongsTo(db.users.scope('checkGender'), { foreignKey: 'user_id', as: 'userInfo' })

// oneToMany
db.posts.belongsToMany(db.tags, { through: 'post_tag' })
db.tags.belongsToMany(db.posts, { through: 'post_tag' })

//Polymorphic One to Many
db.video = require('./video')(sequelize, DataTypes)
db.image = require('./image')(sequelize, DataTypes)
db.comment = require('./comment')(sequelize, DataTypes)

db.image.hasMany(db.comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'image'
    }
})

db.video.hasMany(db.comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'video'
    }
})

db.comment.belongsTo(db.image, { foreignKey: 'commentableId', constraints: false })
db.comment.belongsTo(db.video, { foreignKey: 'commentableId', constraints: false })

//polymorphic many to many

db.tag_taggable = require('./tag_taggable')(sequelize, DataTypes)

//Relations 
//1 Image to Tag

db.image.belongsToMany(db.tags, {
    through: {
        model: db.tag_taggable,
        unique: false,
        scope: {
            taggableType: 'image'
        }
    },
    foreignKey: 'taggableId',
    constraints: false
})
//2 tage to image

db.tags.belongsToMany(db.image, {
    through: {
        model: db.tag_taggable,
        unique: false,
        scope: {
            taggableType: 'image'
        }
    },
    foreignKey: 'tagId',
    constraints: false
})

//video to tag

db.video.belongsToMany(db.tags, {
    through: {
        model: db.tag_taggable,
        unique: false,
        scope: {
            taggableType: 'video'
        }
    },
    foreignKey: 'taggableId',
    constraints: false
})

//tag to video
db.tags.belongsToMany(db.video, {
    through: {
        model: db.tag_taggable,
        unique: false,
        scope: {
            taggableType: 'video'
        }
    },
    foreignKey: 'tagId',
    constraints: false
})

module.exports = db;
