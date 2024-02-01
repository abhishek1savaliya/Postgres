module.exports = (sequelize, Datatypes) => {

    const User = sequelize.define("users", {
        name: {
            type: Datatypes.STRING,
            set(value) {
                this.setDataValue('name', value + ' singh')
            },
            get() {
                return this.getDataValue('name') + ' lalo ' + this.email;
            }
        },
        email: {
            type: Datatypes.STRING,
            defaultValue: 'test@gmail.com',
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue('email', value + ".in")
            }
        },
        gender: {
            type: Datatypes.STRING,
            validate: {
                // equals: 'male',
                isIn: [['male', 'female']]
            }
        }
    }, {
        // tableName: 'userdata',
        timeStamp: true,
        // createdAt : false
        // createdAt : 'create_at
        //updatedAt : 'update_at,
        // engine : 'MyISM'
    })

    return User
}