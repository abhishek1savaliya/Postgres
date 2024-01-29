const { truncate } = require('fs');
const db = require('../model/index');

const Users = db.users;

const addUser = async (req, res) => {
    try {

        const newUser = await Users.create({
            name: "abhishek Savaliya",
            email: 'test2@gmail.com',
            gender: 'male'
        });

        let response = {
            data: 'ok',
            user: newUser
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
    const data = await Users.create({
        name: "Radha",
        email: 'Radha@gmail.com',
        gender: 'male'
    }, { fields: ['email', 'gender'] }); //only this field goes into database
    res.status(200).json({ message: "success" })
}

module.exports = {
    addUser,
    crud,
    queryData
};
