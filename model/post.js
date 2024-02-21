module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
    });
    return Posts;
};