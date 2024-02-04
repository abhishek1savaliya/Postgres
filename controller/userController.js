const db = require('../model/index');
const { Sequelize, Op, QueryTypes } = require('sequelize');
const Posts = db.posts
const Users = db.users;

const addUser = async (req, res) => {
    try {

        const newUser = await Users.create({
            name: "abhik Savaliya",
            email: 'abhisheksavdfg@gmail.com',
            gender: 'male'
        });

        // const addPost = await Posts.create({
        //     "name": "John Doe",
        //     "title": "My First Post",
        //     "content": "This is the content of my post.",
        //     "user_id": 2
        // })

        let response = {
            data: 'ok',
            user: newUser,
            // post: addPost
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json(error);
    }
};

const crud = async (req, res) => {
    //Insert
    // const data = await Users.create({
    //     name: "abhishek",
    //     email: 'test2@gmail.com',
    //     gender: 'male'
    // });

    //update
    // const data = await Users.update({
    //     name: 'Jay shree Krishna',email : 'abhishek@gmail.com'
    // }, { where: { id: 3 } })

    //delete
    // const data = await Users.destroy({ where: { id: 3 } })

    //truncate
    // let data = await Users.destroy({
    //     truncate: true
    // })

    //bulk Insert
    // const data = await Users.bulkCreate([{
    //     name : 'first',email : 'first@gmail.com' ,gender : 'male'
    // },
    // {
    //     name : 'first',email : 'first@gmail.com' ,gender : 'male'
    // },{
    //     name : 'first',email : 'first@gmail.com' ,gender : 'male'
    // }])

    //find

    let data = await Users.findAll({})
    // let data = await Users.findOne({})

    res.status(200).json({ message: "success", data: data })
}

const queryData = async (req, res) => {
    // const data = await Users.create({
    //     name: "Radha",
    //     email: 'Radha@gmail.com',
    //     gender: 'male'
    // }, { fields: ['email', 'gender'] }); //only this field goes into database

    //select
    // let data = await Users.findAll({});
    // let data = await Users.findOne({});
    // const data = await Users.findAll({ attributes: ['name', 'email'] }); //only for particular field 

    // const data = await Users.findAll({
    //     attributes: [
    //         'name',
    //         ['email', 'emailId'],
    //         'gender',
    //         [Sequelize.fn('CONCAT', Sequelize.col('email')), 'emailCount']
    //     ],
    //     group: ['name', 'email', 'gender']
    // });

    // const data = await Users.findAll({
    //     attributes: {
    //         exclude: ['createdAt'],
    //         include: [
    //             [Sequelize.fn('CONCAT', Sequelize.col('name'), 'singh'), 'fullname']
    //         ]
    //     }
    // })

    // const data = await Users.findAll({
    //     attributes: ['email', 'name'],
    //     where: {
    //         id: {
    //             [Op.gt]: 53
    //         },
    //         email: {
    //             [Op.like]: '%@gmail.com'
    //         }
    //     },
    //     order: [
    //         ['name', 'DESC']
    //     ],
    //     group: ['email', 'name'],
    //     limit: 2,
    //     offset: 2
    // });

    const data = await Users.count({});

    res.status(200).json({ message: "success", data: data })
}

const findData = async (req, res) => {

    // const data = await Users.findAll({})
    // const data = await Users.findOne({})
    // const data = await Users.findByPk(60)
    // const data = await Users.findAndCountAll({ where: { email: 'first@gmail.com' } })

    const [data, created] = await Users.findOrCreate({
        where: { name: 'dummy1' },
        defaults: {
            email: 'dummy1@gmail.com',
            gender: 'male'
        }
    })

    res.json({
        message: "finder",
        data: data,
        add: created
    })
}

const getSet = async (req, res) => {

    // const data = await Users.create({
    //     name: "Mahesh",
    //     email: 'mahesh@gmail.com',
    //     gender: 'male'
    // });

    const data = await Users.findAll({})

    res.status(200).json({
        message: true,
        data: data
    })
}

const validation = async (req, res) => {
    try {
        const data = await Users.create({
            name: "Rajesh",
            email: 'Raadsgh@gmail.com',
            gender: 'female'
        });
        res.json({ message: data })
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
}

const rawQuery = async (req, res) => {
    try {
        const users = await db.sequelize.query('select * from users where gender = :gender', {
            type: QueryTypes.SELECT,
            // model : Users,
            // mapToModel : true,
            // raw: true

        })
        res.json({ message: "raw query", record: users })
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
}

const oneToOne = async (req, res) => {

    const data = await Users.findAll({
        attributes: ['name', 'email',],
        include: [{
            model: Posts,
            as: 'postDetail',
            attributes: ['title', ['name', 'PostName']]
        }],
        where: {
            id: 4
        }
    })

    res.status(200).json({
        message: true,
        data: data
    })
}

const belongsTo = async (req, res) => {

    const data = await Posts.findAll({
        attributes: ['content', 'title'],
        include: [{
            model: Users,
            as: 'userInfo',
            attributes: ['name', 'email']

        }]
    })

    res.status(200).json({
        message: true,
        data: data
    })
}

const oneToMany = async (req, res) => {
    const data = await Users.findAll({
        attributes: ['name', 'email',],
        include: [{
            model: Posts,
            as: 'postDetail',
            attributes: ['title', ['name', 'PostName']]
        }],
        // where: {
        //     id: 2
        // }
    })

    res.status(200).json({
        message: true,
        data: data
    })
}

module.exports = {
    addUser,
    crud,
    queryData,
    findData,
    getSet,
    validation,
    rawQuery,
    oneToOne,
    belongsTo,
    oneToMany
};