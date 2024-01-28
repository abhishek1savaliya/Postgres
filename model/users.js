module.exports = (sequelize, Datatypes) => {
    
    const User = sequelize.define("users", {
        name: Datatypes.STRING,
        email: {
            type: Datatypes.STRING,
            defaultValue: 'test@gmail.com'
        },
        gender: {
            type: Datatypes.STRING
        }
    }, {
        // tableName: 'userdata',
        timeStamp: true
        // createdAt : false
        // createdAt : 'create_at
        //updatedAt : 'update_at,
        //engine : 'MyISM
    })

    return User
}